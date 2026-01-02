# English A1 Module 1 Deployment Guide

## ✅ Security Check Complete
Your `.gitignore` is properly configured:
- `serviceAccountKey.json` ✅ (line 25)
- `scripts/serviceAccountKey.json` ✅ (line 26)

The service account key will **never** be tracked by Git.

---

## 📋 Deployment Steps

### Step 1: Add Service Account Key
Place your `serviceAccountKey.json` file in the `scripts/` folder:
```
chirp-polly/
  └── scripts/
      └── serviceAccountKey.json  ← Add here
```

### Step 2: Run Upload Script
Open your terminal in the project root and run:
```bash
node scripts/upload_english_a1_m01.js
```

### Step 3: Expected Output
You should see:
```
--- Uploading English A1 Module 1 ---

Creating English language document...
✅ English language document created.

Creating A1 level metadata...
✅ A1 level metadata created.

Uploading: en_a1_m01 (Personal Pronouns & To Be)
✅ Module 1 uploaded successfully!

--------------------------------------------
English A1 Module 1 is now live!
Visit your app to see it in the language selector.
--------------------------------------------
```

---

## 🔍 What Gets Created in Firestore

### 1. Language Document
**Path:** `languages/english`
```json
{
  "languageId": "english",
  "name": "English",
  "nativeScript": "English",
  "flag": "🇬🇧",
  "enabled": true
}
```

### 2. Level Metadata
**Path:** `languages/english/levels/a1`
```json
{
  "levelId": "a1",
  "name": "A1",
  "description": "Beginner (CEFR A1)",
  "moduleCount": 1,
  "status": "In Progress"
}
```

### 3. Module Data
**Path:** `languages/english/levels/a1/modules/en_a1_m01`
```json
{
  "moduleId": "en_a1_m01",
  "theme": "Personal Pronouns & To Be",
  "level": "A1",
  "vocabularyItems": [
    {
      "word": "I",
      "phonetic": "/aɪ/",
      "usage": "I am a student from India."
    },
    ... (100 words total)
  ]
}
```

---

## 🚨 Troubleshooting

### Error: "Cannot find module './serviceAccountKey.json'"
**Solution:** Make sure the file is in `scripts/serviceAccountKey.json`

### Error: "Permission denied"
**Solution:** Verify your service account has Firestore write permissions in the Firebase Console

### Error: "Project not found"
**Solution:** Ensure the service account key is from the **my-gift-pool** project

---

## ✅ Verification

After deployment, verify in Firebase Console:
1. Go to https://console.firebase.google.com/
2. Select **my-gift-pool** project
3. Navigate to **Firestore Database**
4. Check path: `languages/english/levels/a1/modules/en_a1_m01`
5. Verify 100 vocabulary items exist

---

## 🎯 Next Steps

Once Module 1 is deployed successfully:
1. Test it in your app (English should appear in language selector)
2. Approve for full rollout
3. I'll generate Modules 2-10 (900 more words)
4. Complete the 1,000-word English A1 curriculum

---

**Ready to deploy!** Just add the service account key and run the command. 🚀
