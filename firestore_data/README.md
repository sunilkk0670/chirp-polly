# Firestore Data Upload Guide

## Overview
This directory contains sample data structures for uploading to Firestore.

## Files

### `initial_structure.json`
Contains the base language and level metadata. Upload this first to set up the foundation.

**Structure:**
- 5 languages (Japanese, Hindi, French, Korean, Chinese)
- 3 enabled initially (Japanese, Hindi, French)
- 3 CEFR levels (A1, A2, B1)

### `sample_japanese_a1_module.json`
Sample module data for Japanese A1 Module 1 (Greetings & Introductions).

**Path in Firestore:**
```
languages/japanese/levels/a1/modules/jp_a1_m1
```

## Upload Instructions

### Option 1: Firebase Console (Manual)
1. Go to Firebase Console → Firestore Database
2. Create collections and documents manually
3. Copy-paste JSON data into fields

### Option 2: Firebase CLI (Recommended)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Deploy Firestore rules
firebase deploy --only firestore:rules

# Use a script to upload data (see upload_script.js)
```

### Option 3: Admin SDK Script
Create a Node.js script using Firebase Admin SDK to batch upload data.

## Setting Admin Claims

To set a user as admin (required for write access):

### Using Firebase Console
1. Go to Authentication → Users
2. Select user
3. Set custom claims via Cloud Functions or Admin SDK

### Using Firebase Admin SDK
```javascript
const admin = require('firebase-admin');
admin.initializeApp();

// Set admin claim
admin.auth().setCustomUserClaims('USER_UID', { admin: true })
  .then(() => console.log('Admin claim set'))
  .catch(error => console.error(error));
```

### Using Cloud Function
```javascript
exports.setAdminClaim = functions.https.onCall(async (data, context) => {
  // Verify caller is already an admin
  if (!context.auth.token.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Only admins can set admin claims');
  }
  
  await admin.auth().setCustomUserClaims(data.uid, { admin: true });
  return { success: true };
});
```

## Data Migration from curriculum_data.dart

To migrate existing curriculum data:

1. **Extract data** from `lib/features/curriculum/data/datasources/curriculum_data.dart`
2. **Transform** to Firestore JSON format
3. **Upload** using batch writes for efficiency

See `scripts/migrate_to_firestore.dart` for automated migration (to be created).

## Security Notes

⚠️ **IMPORTANT**: 
- Never upload data without deploying `firestore.rules` first
- Test rules in Firestore Rules Playground before deploying
- Set up billing alerts to protect your $300 credit
- Enable Firestore offline persistence in app to minimize reads

## Cost Optimization

### Reads
- Cache language/level lists locally
- Use offline persistence
- Lazy load modules only when needed

### Writes
- Batch operations when uploading
- Admin-only writes prevent accidental costs
- No client-side writes from student apps
