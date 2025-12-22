// Firebase Admin SDK script to set admin custom claim
// Run this with: node set_admin_claim.js

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// Make sure you have your service account key JSON file
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Your UID
const uid = 'dAmhiMiKEOaHhuUDYtEdjH7nBNi2';

// Set admin custom claim
admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log('✅ Successfully set admin claim for user:', uid);
    console.log('The user will need to sign out and sign back in for the claim to take effect.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error setting admin claim:', error);
    process.exit(1);
  });
