# Spanish A2 Module 01 Setup Plan

## Objective
Set up Spanish A2 curriculum with Module 01 (Past Tense & Childhood theme), including local assets, Firebase sync, and UI integration.

## Steps

### 1. Create Local Directory Structure
- Create folder: `assets/data/curriculum/es_a2/`

### 2. Create Local JSON File
- Create `es_a2_m01.json` with the provided 100-word vocabulary set
- Verify JSON structure matches existing module format
- Ensure word #10 is "Fueron" as specified

### 3. Register Asset in pubspec.yaml
- Add `assets/data/curriculum/es_a2/` to the assets section
- Maintain alphabetical ordering with existing curriculum paths

### 4. Create Firebase Upload Script
- Create `scripts/upload_spanish_a2_m01.js`
- Upload module to Firestore with ID: `es_a2_m01`
- Update Spanish A2 level metadata (moduleCount: 1, status: 'In Progress')

### 5. Update UI - Language Selection Screen
- Modify `lib/features/curriculum/presentation/pages/home_page.dart`
- Add new section: "Spanish (A2)" with Module 01
- Follow existing pattern for level grouping

### 6. Validation
- Hot restart (R) the app
- Navigate to Spanish A2 → Module 01
- Verify word #10 displays "Fueron" with translation "They went / They were"

## Architecture Compliance
✅ Clean Architecture: Assets organized by feature (curriculum/language/level)
✅ Repository Pattern: Firebase sync through dedicated script
✅ Data Models: JSON structure matches existing freezed models
✅ Multilingual: Spanish content with phonetic support
