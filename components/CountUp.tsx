"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * Número que cuenta desde cero al entrar en pantalla. Con reduced motion muestra el valor final directo.
 * El HTML del servidor trae el valor final (lo que leen Google y los lectores sin JS);
 * en el cliente se pone en cero antes de pintar para animar.
 */
export default function CountUp({ value, prefix = "", suffix = "", className }: CountUpProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1800, bounce: 0 });

  useLayoutEffect(() => {
    if (ref.current) ref.current.textContent = `${prefix}0${suffix}`;
  }, [prefix, suffix]);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
    });
  }, [spring, prefix, suffix]);

  if (reduceMotion) {
    return <span className={className}>{`${prefix}${value}${suffix}`}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {`${prefix}${value}${suffix}`}
    </span>
  );
}
