# Third-Party Licenses and Model Terms

Last updated: 2026-03-15

This file tracks licenses and terms for models/services referenced by this
project. Keep this file current before each production release.

## Important distinction

- Code in this repository can be MIT-licensed.
- Model weights and hosted model APIs are licensed under provider-specific
  terms and are not automatically covered by MIT.

## Model and tool inventory

| Component | Provider | License/Terms | Redistribution | Link |
|---|---|---|---|---|
| TranslateGemma | Google | Gemma Terms | Allowed under terms; must include required notices and comply with prohibited-use policy | https://ai.google.dev/gemma/terms |
| Gemma family policies | Google | Prohibited Use Policy + Intended Use Statement | Must flow down to users and enforce in product operations | https://ai.google.dev/gemma/prohibited_use_policy |
| M2M100 | Meta | MIT | Permissive | https://huggingface.co/facebook/m2m100_418M |
| OPUS-MT (example) | Helsinki-NLP | Apache-2.0 | Permissive with Apache notice requirements | https://huggingface.co/Helsinki-NLP/opus-mt-en-es |
| Whisper | OpenAI | MIT | Permissive | https://github.com/openai/whisper |
| Vosk API | Alpha Cephei | Apache-2.0 | Permissive with Apache notice requirements | https://github.com/alphacep/vosk-api |
| Piper | rhasspy | MIT | Permissive | https://github.com/rhasspy/piper |
| Qwen2.5 Instruct | Qwen | Apache-2.0 | Permissive with Apache notice requirements | https://huggingface.co/Qwen/Qwen2.5-7B-Instruct |

## Release checklist for legal/compliance

1. Confirm all deployed models are listed above with current versions.
2. Include all required attribution, notices, and license files.
3. Verify user-facing Terms and AUP include prohibited-use flow-down clauses.
4. Verify moderation controls are enabled and tested.
5. For redistributed checkpoints, include upstream terms and modification notes.

## Not legal advice

This file is an engineering compliance aid, not legal advice.
