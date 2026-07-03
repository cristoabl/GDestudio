"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Carrusel WebGL: transición de distorsión líquida entre renders,
 * con aberración cromática sutil y zoom Ken Burns continuo.
 * Sin dependencias: WebGL crudo (~6kb). Si WebGL falla, no renderiza nada
 * y queda visible la imagen estática que Hero muestra debajo.
 */

const TRANSITION_MS = 1400;
const KEN_BURNS_PER_SEC = 0.016; // zoom por segundo mientras la imagen está en pantalla

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex0;
uniform sampler2D uTex1;
uniform float uProgress;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uImgRes0;
uniform vec2 uImgRes1;
uniform float uZoom0;
uniform float uZoom1;

vec2 coverUv(vec2 uv, vec2 imgRes, float zoom) {
  float rCanvas = uRes.x / uRes.y;
  float rImg = imgRes.x / imgRes.y;
  vec2 scale = rCanvas < rImg
    ? vec2(rCanvas / rImg, 1.0)
    : vec2(1.0, rImg / rCanvas);
  vec2 st = (uv - 0.5) * scale / zoom + 0.5;
  return st;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

void main() {
  float p = smoothstep(0.0, 1.0, uProgress);
  float intensity = 1.0 - abs(2.0 * p - 1.0); // pico a mitad de transición

  // Campo de distorsión orgánico
  float n = noise(vUv * 5.0 + uTime * 0.08);
  float n2 = noise(vUv * 11.0 - uTime * 0.05);
  vec2 disp = vec2(n - 0.5, n2 - 0.5) * 0.35;

  vec2 uvA = coverUv(vUv + disp * p, uImgRes0, uZoom0);
  vec2 uvB = coverUv(vUv - disp * (1.0 - p), uImgRes1, uZoom1);

  vec4 colA = texture2D(uTex0, uvA);

  // Aberración cromática sutil en la imagen entrante
  float ab = 0.012 * intensity;
  vec4 colB = vec4(
    texture2D(uTex1, uvB + vec2(ab, 0.0)).r,
    texture2D(uTex1, uvB).g,
    texture2D(uTex1, uvB - vec2(ab, 0.0)).b,
    1.0
  );

  gl_FragColor = mix(colA, colB, p);
}`;

interface HeroCanvasProps {
  images: { src: string }[];
  index: number;
}

type Tex = { texture: WebGLTexture; width: number; height: number; loaded: boolean };

export default function HeroCanvas({ images, index }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const indexRef = useRef(index);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  indexRef.current = index;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) {
      setFailed(true);
      return;
    }

    // --- Programa ---
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(program);

    // --- Quad ---
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = {
      tex0: gl.getUniformLocation(program, "uTex0"),
      tex1: gl.getUniformLocation(program, "uTex1"),
      progress: gl.getUniformLocation(program, "uProgress"),
      time: gl.getUniformLocation(program, "uTime"),
      res: gl.getUniformLocation(program, "uRes"),
      imgRes0: gl.getUniformLocation(program, "uImgRes0"),
      imgRes1: gl.getUniformLocation(program, "uImgRes1"),
      zoom0: gl.getUniformLocation(program, "uZoom0"),
      zoom1: gl.getUniformLocation(program, "uZoom1"),
    };
    gl.uniform1i(u.tex0, 0);
    gl.uniform1i(u.tex1, 1);

    // --- Texturas ---
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    const textures: Tex[] = images.map(() => {
      const texture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([10, 10, 10]));
      return { texture, width: 1, height: 1, loaded: false };
    });

    let disposed = false;
    const loadTexture = (i: number) =>
      new Promise<void>((resolve) => {
        const el = new window.Image();
        el.crossOrigin = "anonymous";
        el.onload = () => {
          if (!disposed) {
            gl.bindTexture(gl.TEXTURE_2D, textures[i].texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, el);
            textures[i].width = el.naturalWidth;
            textures[i].height = el.naturalHeight;
            textures[i].loaded = true;
          }
          resolve();
        };
        el.onerror = () => resolve();
        el.src = images[i].src;
      });

    // Carga escalonada: la primera imagen ya, el resto de a una en segundo plano
    // para no competir con la carga inicial de la página.
    (async () => {
      await loadTexture(0);
      for (let i = 1; i < images.length; i++) {
        if (disposed) return;
        await loadTexture(i);
      }
    })();

    // --- Resize ---
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // Pausar el render cuando el hero no está en pantalla:
    // un canvas fullscreen dibujando a 60fps fuera de vista lagea todo el scroll.
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    // --- Loop ---
    let current = 0;
    let next = 0;
    let transitionStart = 0;
    let slideStart = performance.now();
    let firstFrame = false;
    let raf = 0;

    const render = (now: number) => {
      raf = requestAnimationFrame(render);

      if (!visible) return;

      const target = indexRef.current;
      let inTransition = next !== current;

      if (!inTransition && target !== current && textures[target].loaded && textures[current].loaded) {
        next = target;
        transitionStart = now;
        inTransition = true;
      }

      let progress = 0;
      if (inTransition) {
        progress = Math.min((now - transitionStart) / TRANSITION_MS, 1);
        if (progress >= 1) {
          current = next;
          slideStart = now;
          progress = 0;
          inTransition = false;
        }
      }

      const t0 = textures[current];
      const t1 = textures[inTransition ? next : current];

      if (!firstFrame && t0.loaded) {
        firstFrame = true;
        setReady(true);
      }

      const zoom0 = 1 + ((now - slideStart) / 1000) * KEN_BURNS_PER_SEC;
      const zoom1 = 1 + ((progress * TRANSITION_MS) / 1000) * KEN_BURNS_PER_SEC;

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, t0.texture);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, t1.texture);

      gl.uniform1f(u.progress, progress);
      gl.uniform1f(u.time, now / 1000);
      gl.uniform2f(u.res, canvas.width, canvas.height);
      gl.uniform2f(u.imgRes0, t0.width, t0.height);
      gl.uniform2f(u.imgRes1, t1.width, t1.height);
      gl.uniform1f(u.zoom0, Math.min(zoom0, 1.18));
      gl.uniform1f(u.zoom1, Math.min(zoom1, 1.18));

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(render);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      textures.forEach((t) => gl.deleteTexture(t.texture));
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (failed) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
    />
  );
}
