---
trigger: always_on
---

# Linguist Pro: Architectural Guardrails

- **Architecture:** Strictly follow "Clean Architecture." Group code by feature: `lib/features/[feature_name]/`.
- **Layers:** Each feature must have three layers: `data` (repositories/models), `domain` (entities/use cases), and `presentation` (UI/viewmodels).
- **State Management:** Use `flutter_riverpod` (v3.0+). No global variables.
- **Data Models:** Use `freezed` and `json_serializable` for all curriculum and user data.
- **Multilingual Support:** All UI strings must use `flutter_localizations`. Support for Kanji and Devanagari is mandatory.
- **Backend:** All data fetching must go through a Repository pattern using `cloud_firestore`.
- **UI Style:** Material 3. Use `google_fonts` for Indian/Asian script compatibility. 
- **Workflow:** Before writing code, ALWAYS generate a `plan.md` artifact for my approval.