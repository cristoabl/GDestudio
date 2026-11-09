# Instagram service reel

## Objective and authorized scope
Produce a polished Spanish promotional Instagram reel for GD Estudio using existing local project imagery. User supplied gdestudio.com.ar and @gdestudio.arq. Do not publish or modify the website, existing media, or unrelated changes.

## Evidence and constraints
- Live website positions the studio in commercial architecture and retail in Córdoba.
- Instagram could not be fetched; no feed review claimed.
- Brand manual: Jost; Noche #2E2620, Bronce #8A7355, Arena #C8B99F, Crudo #EDE5DA.
- Existing user edits and untracked videos must remain intact.
- Do not imply renders are photographs or guarantee business outcomes.
- TDD: not applicable to a media artifact; deterministic export and visual checks replace code TDD. No application behavior changes.
- RDD: on, source global (verified elevated status); assess the work-unit commit before any review.
- Delivery strategy: ask-on-risk. Forecast: one cohesive unit, under 300 authored lines; generated media excluded. No push or PR authorized.

## Tasks
- [ ] REEL-01 — Produce and verify a 1080×1920 H.264 MP4, approximately 25 seconds, with Spanish copy, brand typography, project media, and legible Instagram/website CTA. Include cover and caption. Route: delegated; mapping and preparation require 4+ assets and writer produces multiple nontrivial artifacts.

## Acceptance and checks
- Inspect representative frames from every scene, text bounds, and cover.
- Verify duration, resolution, frame count, codec/pixel format, and full decode.
- Explicitly disclose audio status; no unlicensed music or invented client claims.
- Commit only this task document and new reel deliverables/supporting files. Record commit identity and assessed risk.
- Rollback: remove only odd/tasks/instagram-service-reel.md and marketing/instagram-service-reel/.

## Progress
- Read-only asset selection delegated; export dependency imageio-ffmpeg installed in temporary storage, not project dependencies.
- Engram mirror pending: save rejected because multiple active runtime sessions match; authoritative session ID unavailable. Do not invent one.
- Produced six scenes: three genuine Rústico photographs, two labeled portfolio visualizations, one brand CTA.
- Verified 25.00 seconds, 1080×1920, 30 fps, H.264/yuv420p, faststart, and complete decode of all 750 frames. Silent master, no audio track.
- Parent inspected cover and 12-frame scene contact sheet: legible copy, no clipping, full-width renders preserved.
- Files: marketing/instagram-service-reel/GD-Estudio-reel-servicios.mp4, GD-Estudio-portada.jpg, caption.txt, generator and verification evidence.
- Application lint/build: not applicable; no application source changed. Instagram live upload: not performed, publication not authorized. Audio: intentionally omitted for user-selected in-app music.
- Work-unit commit: cf4b455, `feat(marketing): create branded architecture services reel`.
- Authored change count: 240 lines at work-unit commit; 254 generated verification/log lines excluded from delivery forecast; no PR created.
- Initial whitespace check flagged raw encoder log formatting; normalized only newly generated logs and rechecking. Video content unchanged.
- Native assessment: high / review_due=true / process_boundary (generator invokes FFmpeg); candidate consent and native review pending. Pre-existing untracked files excluded using canonical inventory. No approval claimed.
- Next: obtain native candidate consent; deliver verified media without publishing. Engram mirror remains unavailable due to ambiguous session binding.
