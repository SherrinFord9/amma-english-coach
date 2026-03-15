# Gemma Compliance Checklist

Last updated: 2026-03-15

Use this checklist whenever Gemma/TranslateGemma is used in development,
staging, or production.

## 1) Licensing and notices

- [ ] Gemma Terms URL is documented in public/legal docs.
- [ ] Required notices are included with any redistributed model artifacts.
- [ ] Modified files/checkpoints are clearly marked as modified.
- [ ] `THIRD_PARTY_LICENSES.md` reflects deployed model IDs and versions.

## 2) Prohibited-use controls

- [ ] Acceptable Use Policy includes prohibited-use categories aligned to Gemma.
- [ ] User Terms state users must comply with platform/model restrictions.
- [ ] Safety filters block obvious disallowed requests.
- [ ] Abuse-report and account enforcement paths are active.

## 3) Product and operations

- [ ] Moderation is applied to both user prompts and model outputs.
- [ ] Incident response runbook exists for policy violations.
- [ ] Logging supports audit of high-risk actions and policy decisions.
- [ ] Team owner is assigned for model policy updates.

## 4) Distribution scenarios

- [ ] API-only usage: terms are reflected in product ToS/AUP.
- [ ] On-prem/self-host package: includes terms + notices bundle.
- [ ] Fine-tuned release: upstream terms and modification metadata included.

## 5) Periodic review

- [ ] Terms and policy URLs are rechecked at each release.
- [ ] Compliance sign-off recorded before production deploy.

## Source documents

- Gemma Terms: https://ai.google.dev/gemma/terms
- Prohibited Use Policy: https://ai.google.dev/gemma/prohibited_use_policy
- Intended Use Statement: https://ai.google.dev/gemma/intended_use_statement
