# Punchier Instagram promotional reel

## Objective and authorization
Create a second, more energetic promotional reel for GD Estudio, following the user's explicit request for a more "crunchy" Instagram version. Preserve the first reel and all unrelated changes. No publishing, ad spend, account access, or website changes authorized.

## Creative direction and evidence
- 16 seconds, vertical 1080x1920/30 fps. Larger kinetic typography, short beat-synced project cuts, restrained camera movement, readable final CTA for three seconds.
- Spanish copy and verified commercial-architecture positioning in Córdoba.
- Hook: "QUE TU LOCAL / NO PASE / DESAPERCIBIDO." End: "HABLEMOS." with @gdestudio.arq and gdestudio.com.ar.
- Existing genuine Rústico photography and clearly labeled Zhoue/Arka 3D visualizations.
- Jost; warm Noche/Crudo/Arena/Bronce palette. No rapid flashes, misleading before/after, or unsupported sales promises.
- Original locally synthesized 120 BPM instrumental beat; no downloaded music/samples. Include silent alternative.

## Route and verification configuration
- Delegated route: preparation explores previous generator and multiple assets; writer owns multiple nontrivial new artifacts. Read-only preparation completed by produce_reel worker.
- TDD: not applicable to media production. Export/full-decode/visual/text/audio checks are the acceptance runner; no application changes.
- Branch: codex/instagram-crunchy-reel. Base: bee2bb9068793e99443ce486225d97b651d8f8a5.
- RDD on, global source; previous preflight stopped on managed_assets_outdated. Do not update unrelated configuration or claim approval.
- Delivery strategy ask-on-risk; forecast 330-370 authored lines, generated files excluded. One cohesive work unit; no PR or push.

## Tasks
- [x] CRUNCH-01 — Produced main MP4 with original audio, silent alternate, cover, Spanish caption, and reproducible generator/verification evidence. Verified visual quality, beat timing, safe text placement, H.264/yuv420p + AAC, duration, 480 decoded video frames, audio headroom/fades, and unchanged first reel. Native review remains separate from these functional checks.

## Acceptance and rollback
- Parent inspects encoded-frame contact sheet including hook, project labels, and final CTA.
- No clipped text, flashing effects, or clipped audio. Verify sound exists through decoded audio RMS/peak/duration; disclose if listening is unavailable.
- No application lint/build needed because website unchanged. No Instagram upload test or publication.
- Commit only new marketing/instagram-crunchy-reel/ and this document. Rollback is removal of those two paths only.
- Preserve pre-existing modifications, including final tracking edits for the first reel.

## Progress and next step
- Existing export dependencies/Jost conversion are available; no new dependency expected.
- Engram mirror pending: ambiguous active runtime sessions; no authoritative session ID available, none invented.
- Export: both videos 16.00 seconds, 1080x1920, 30 fps, H.264/yuv420p, faststart. Complete decode of 480 frames per video exited 0. Main 4,287,505 bytes; silent 3,866,771 bytes.
- Audio: original oscillator/noise synthesis at 120 BPM, AAC stereo, 16.00 decoded seconds, peak -4.18 dBFS, RMS -19.03 dBFS. No clipping detected; listening not performed (signal checks only).
- Visual: worker and parent inspected encoded contact sheet and cover; complete hook, legible 3D labels and clear CTA. No visual revisions required.
- First reel SHA-256 unchanged: 326c4f4a43a07e90dfda9fe3e248947ce00e48be03eb588a940a40a75aab1fb5.
- Generator 232 authored lines; task document/caption keep total below 400. Verification JSON and visual/media exports are generated artifacts.
- No website lint/build or Instagram upload test: not applicable or not authorized. User should preview audio before publishing.
- Next: commit verified work unit, assess native review availability, deliver preview and support files.
