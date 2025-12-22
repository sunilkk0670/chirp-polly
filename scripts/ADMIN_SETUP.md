# Setting Admin Custom Claim

## Your UID
```
dAmhiMiKEOaHhuUDYtEdjH7nBNi2
```

## Method 1: Using Node.js Script (Recommended)

### Prerequisites
1. Node.js installed
2. Firebase Admin SDK service account key

### Steps

1. **Get Service Account Key**
   - Go to Firebase Console → Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save as `serviceAccountKey.json` in the `scripts/` folder

2. **Install Firebase Admin SDK**
   ```bash
   cd scripts
   npm init -y
   npm install firebase-admin
   ```

3. **Run the Script**
   ```bash
   node set_admin_claim.js
   ```

4. **Sign Out and Sign Back In**
   - The custom claim won't take effect until you sign out and sign back in
   - Or force token refresh in your app

## Method 2: Using Firebase CLI

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Use Firebase Functions to set claim
firebase functions:shell
> admin.auth().setCustomUserClaims('dAmhiMiKEOaHhuUDYtEdjH7nBNi2', { admin: true })
```

## Method 3: Using Cloud Function

Deploy this function and call it once:

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.setAdminClaim = functions.https.onRequest(async (req, res) => {
  const uid = 'dAmhiMiKEOaHhuUDYtEdjH7nBNi2';
  
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    res.send('Admin claim set successfully!');
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
});
```

Then call: `https://YOUR_PROJECT.cloudfunctions.net/setAdminClaim`

## Method 4: Using Firebase Console Extension

1. Install "Custom Claims" extension from Firebase Extensions
2. Use the extension to set claims via UI

## Verification

After setting the claim, verify it worked:

```javascript
// In your Flutter app
final user = FirebaseAuth.instance.currentUser;
final idTokenResult = await user?.getIdTokenResult(true);
print('Admin claim: ${idTokenResult?.claims?['admin']}');
```

## Important Notes

⚠️ **Security**: 
- Keep your service account key secure
- Never commit `serviceAccountKey.json` to version control
- Add it to `.gitignore`

⚠️ **Token Refresh**:
- Custom claims are included in the ID token
- User must sign out and sign back in, or force token refresh
- Claims can take up to 1 hour to propagate

## Testing Admin Access

Once set, test in Firestore Rules Playground:
```
Auth: { uid: 'dAmhiMiKEOaHhuUDYtEdjH7nBNi2', token: { admin: true } }
Path: /languages/japanese
Operation: write
```

Should return: ✅ Allow
