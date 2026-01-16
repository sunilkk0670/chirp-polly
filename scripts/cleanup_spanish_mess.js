const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const levels = ['a1', 'a2', 'b1'];

async function cleanup() {
    console.log("Starting Cleanup of Messy Spanish Modules...");

    for (const level of levels) {
        process.stdout.write(`Processing level ${level}... `);
        const modulesRef = db.collection('languages').doc('spanish')
            .collection('levels').doc(level)
            .collection('modules');

        const snapshot = await modulesRef.get();
        let deletedCount = 0;

        for (const doc of snapshot.docs) {
            const id = doc.id;
            // Matches es_a1_m1 to es_a1_m10 (no leading zero for single digits)
            // Pattern: es_[level]_m[1-9]$ or es_[level]_m10$
            const regex = new RegExp(`^es_${level}_m([1-9]|10)$`);

            if (regex.test(id)) {
                console.log(`\n  Deleting messy module: ${id}`);
                await doc.ref.delete();
                deletedCount++;
            }
        }
        console.log(`Deleted ${deletedCount} modules.`);
    }

    console.log("\nCleanup Complete.");
    process.exit();
}

cleanup().catch(err => {
    console.error(err);
    process.exit(1);
});
