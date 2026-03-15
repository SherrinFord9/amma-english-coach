# language_Learn

Open-source language tutor application code with a model-agnostic backend.

## Local website MVP

This repo includes a local website MVP with translation provider fallback:

- `index.html`
- `styles.css`
- `app.js`
- `server.js`

Features:

- Kannada-first beginner English lessons
- Sarvam-powered lesson generation by topic/level (`/api/generate-lesson`)
- Phrase audio playback (normal + slow)
- Voice practice via browser speech recognition (if supported)
- Tutor conversation mode (text + voice where browser supports it)
- Text fallback answer checking
- Local progress tracking with streak/mastery (`localStorage`)
- Plain-language UI labels for non-technical learners
- Translation API fallback chain: `sarvam -> gemini -> openrouter -> mymemory`

Run locally:

```bash
cd /home/sherrinford/language_Learn
cp .env.example .env
node server.js
```

Then open `http://localhost:4173`.

Run clarity audit (grandma-friendly wording check):

```bash
npm run check:grandma
```

If you only want static pages (without translation API), you can still run:

```bash
python3 -m http.server 4173
```

## Deploy on Render (Free)

1. Push this repo to GitHub.
2. In Render, click `New +` -> `Blueprint`.
3. Select the GitHub repo and deploy using `render.yaml`.
4. Set `SARVAM_API_KEY` in Render Environment.
5. Open the generated `onrender.com` URL.

Notes for free plan:

- Service sleeps after inactivity and wakes on next visit.
- First request after sleep can take ~30-60 seconds.

### Provider setup

- `SARVAM_API_KEY`: best for Kannada translation quality.
- `SARVAM_CHAT_MODEL`: model used for phrase generation (`sarvam-30b` default).
- `GEMINI_API_KEY`: good backup with free tier limits in AI Studio.
- `OPENROUTER_API_KEY`: optional additional fallback.
- If no keys are set, the app still tries a public MyMemory fallback.

## Licensing model

- Repository source code: MIT (`LICENSE`)
- Third-party models/services: licensed separately by their providers

This repository can remain open source while using non-OSI model terms (for
example Gemma Terms) as long as model licensing is documented and respected.

## Compliance docs

- `THIRD_PARTY_LICENSES.md`: model/license inventory and redistribution notes
- `compliance/GEMMA_COMPLIANCE_CHECKLIST.md`: Gemma operational requirements
- `policies/ACCEPTABLE_USE_POLICY.md`: end-user policy baseline
- `policies/MODEL_PROVIDER_TERMS_FLOWDOWN.md`: required flow-down obligations

## Notes

This repository does not itself include model weights. If you distribute
fine-tuned checkpoints, review `THIRD_PARTY_LICENSES.md` and provider terms.
