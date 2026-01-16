const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function verify() {
    console.log("FINAL VERIFICATION OF SPANISH B1 RESTORATION");

    // Check Module 10
    const m10 = await db.doc('languages/spanish/levels/b1/modules/es_b1_m10').get();
    if (m10.exists) {
        const data = m10.data();
        console.log(`Module ID: ${data.moduleId}`);
        console.log(`Theme: ${data.theme}`);
        console.log(`Lesson Count: ${data.lessons.length}`);
        console.log(`Last word in Lesson 10: ${data.lessons[9].vocabularyItems[9].targetText}`);
    } else {
        console.error("Module es_b1_m10 NOT FOUND!");
    }

    // Check Metadata
    const meta = await db.doc('languages/spanish/levels/b1').get();
    console.log(`Metadata - Count: ${meta.data().moduleCount}, Status: ${meta.data().status}`);

    process.exit();
}

verify();
