const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

if (!admin.apps.length) {
    const serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, 'serviceAccountKey.json'), 'utf8'));
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function deepLessonCheck() {
    const modules = ['zh_a1_m01', 'zh_a1_m02'];

    for (const moduleId of modules) {
        const doc = await db.doc(`languages/chinese/levels/a1/modules/${moduleId}`).get();
        if (doc.exists) {
            console.log(`\n=== ${moduleId} Lessons ===`);
            doc.data().lessons.forEach(l => {
                console.log(`  ${l.order}: ${l.title}`);
            });
        }
    }
    process.exit(0);
}

deepLessonCheck();
