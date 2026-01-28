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

async function checkFirestoreLessonTitles() {
    const modulesToCheck = ['zh_a1_m01', 'zh_a1_m03', 'zh_a2_m01', 'zh_a2_m02'];

    for (const moduleId of modulesToCheck) {
        const level = moduleId.includes('a1') ? 'a1' : 'a2';
        const modulePath = `languages/chinese/levels/${level}/modules/${moduleId}`;

        try {
            const doc = await db.doc(modulePath).get();
            if (doc.exists) {
                const data = doc.data();
                console.log(`\n=== ${moduleId} (Firestore) ===`);
                console.log(`Theme: ${data.theme}`);
                console.log(`Lessons:`);
                data.lessons.forEach(lesson => {
                    console.log(`  ${lesson.order}: ${lesson.title}`);
                });
            } else {
                console.log(`❌ ${moduleId} not found in Firestore`);
            }
        } catch (error) {
            console.error(`Error reading ${moduleId}: ${error.message}`);
        }
    }

    process.exit(0);
}

checkFirestoreLessonTitles();
