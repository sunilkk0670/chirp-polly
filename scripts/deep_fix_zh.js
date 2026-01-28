const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase
if (!admin.apps.length) {
    const serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, 'serviceAccountKey.json'), 'utf8'));
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function deepFixZH() {
    console.log('🚀 Starting Deep Fix for Chinese Curriculum...');

    // 1. Consolidate Levels: Delete Uppercase A1/A2 and move data to lowercase a1/a2
    const levelPairs = [
        { old: 'A1', new: 'a1' },
        { old: 'A2', new: 'a2' }
    ];

    for (const pair of levelPairs) {
        console.log(`\n📂 Consolidating level ${pair.old} -> ${pair.new}...`);
        const oldRef = db.doc(`languages/chinese/levels/${pair.old}`);
        const newRef = db.doc(`languages/chinese/levels/${pair.new}`);

        const oldDoc = await oldRef.get();
        if (oldDoc.exists) {
            console.log(`   📦 Moving metadata from ${pair.old} to ${pair.new}...`);
            await newRef.set(oldDoc.data(), { merge: true });

            // Note: We need to move subcollections too (modules)
            // But usually we re-upload them anyway.
            // Let's delete the old level document first.
            await oldRef.delete();
            console.log(`   🗑️ Deleted old level document: ${pair.old}`);
        } else {
            console.log(`   ℹ️ Level ${pair.old} not found, skipping move.`);
        }

        // Also check if there's a modules collection under the OLD level
        const oldModules = await db.collection(`languages/chinese/levels/${pair.old}/modules`).get();
        if (!oldModules.empty) {
            console.log(`   📦 Moving ${oldModules.size} modules from ${pair.old} to ${pair.new}...`);
            for (const doc of oldModules.docs) {
                await db.doc(`languages/chinese/levels/${pair.new}/modules/${doc.id}`).set(doc.data());
                await doc.ref.delete();
            }
            console.log(`   ✅ Finished moving modules for ${pair.old}`);
        }
    }

    // 2. Force Theme Update for A1 and A2
    console.log('\n🛠️  Forcing Theme Updates for English Headings...');

    const themeMap = {
        'zh_a1_m03': "Daily Life",
        'zh_a1_m04': "Free Time & Places",
        'zh_a1_m05': "Home & Shopping",
        'zh_a1_m06': "Travel & Transportation",
        'zh_a1_m07': "Food & Restaurant",
        'zh_a1_m08': "Weather & Nature",
        'zh_a1_m09': "Society & Media",
        'zh_a1_m10': "Review & Mastery",

        'zh_a2_m01': "Social Relationships",
        'zh_a2_m02': "Emotions & Health",
        'zh_a2_m03': "Travel & Culture",
        'zh_a2_m04': "Work & Career",
        'zh_a2_m05': "Media & Technology",
        'zh_a2_m06': "Society & News",
        'zh_a2_m07': "Environment & Nature",
        'zh_a2_m08': "Daily Decisions",
        'zh_a2_m09': "Leisure & Arts",
        'zh_a2_m10': "Review & Mastery"
    };

    for (const [moduleId, newTheme] of Object.entries(themeMap)) {
        const level = moduleId.split('_')[1]; // a1 or a2
        const docRef = db.doc(`languages/chinese/levels/${level}/modules/${moduleId}`);

        const doc = await docRef.get();
        if (doc.exists) {
            console.log(`   📝 Updating theme for ${moduleId}: "${newTheme}"`);
            await docRef.update({ theme: newTheme });
        } else {
            // If it doesn't exist, we should check if we can upload it from local
            console.log(`   ⚠️  Module ${moduleId} not found at ${docRef.path}. Trying to re-upload from local...`);
            const localPath = path.join(__dirname, `../firestore_data/${moduleId}.json`);
            if (fs.existsSync(localPath)) {
                const localData = JSON.parse(fs.readFileSync(localPath, 'utf8'));
                localData.theme = newTheme; // Override with correct English
                await docRef.set(localData);
                console.log(`      ✅ Re-uploaded ${moduleId} from local.`);
            }
        }
    }

    // 3. Final Verification
    console.log('\n🔍 Final Verification (Direct Firestore Get)...');
    const verifyDoc = await db.doc(`languages/chinese/levels/a1/modules/zh_a1_m03`).get();
    if (verifyDoc.exists) {
        console.log(`   ✅ PROOF: zh_a1_m03 theme is NOW: "${verifyDoc.data().theme}"`);
    } else {
        console.log(`   ❌ PROOF FAILED: zh_a1_m03 not found!`);
    }

    const testDocA2 = await db.doc(`languages/chinese/levels/a2/modules/zh_a2_m01`).get();
    if (testDocA2.exists) {
        console.log(`   ✅ PROOF: zh_a2_m01 theme is NOW: "${testDocA2.data().theme}"`);
    }

    console.log('\n✨ Deep Fix Complete.');
    process.exit(0);
}

deepFixZH();
