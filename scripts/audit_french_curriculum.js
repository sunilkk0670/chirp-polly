const admin = require('firebase-admin');

if (!admin.apps.length) {
    const serviceAccount = require('./serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function auditFrenchCurriculum() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🔍 FRENCH CURRICULUM GLOBAL AUDIT');
    console.log('═══════════════════════════════════════════════════════');
    console.log('Scanning all 30 modules (A1: 1-10, A2: 11-20, B1: 21-30)\n');

    const allModules = [];
    const allWords = new Map(); // word -> [{module, index}]
    const fillerPatterns = ['FrenchWord', 'Filler', '---', 'PLACEHOLDER', 'TODO', 'TBD'];

    let totalWordsScanned = 0;
    let loopBugFound = [];
    let fillersFound = [];
    let duplicatesAcrossModules = [];

    // A1 Modules (1-10)
    console.log('📚 Scanning A1 Modules (1-10)...');
    for (let i = 1; i <= 10; i++) {
        const moduleId = `fr_a1_m${i}`;
        const docRef = db.collection('languages').doc('french')
            .collection('levels').doc('a1')
            .collection('modules').doc(moduleId);

        const doc = await docRef.get();
        if (!doc.exists) {
            console.log(`❌ ${moduleId}: NOT FOUND`);
            continue;
        }

        const data = doc.data();
        const words = data.vocabularyItems || [];

        allModules.push({
            id: moduleId,
            level: 'A1',
            order: i,
            words: words,
            count: words.length
        });

        console.log(`   ✅ ${moduleId}: ${words.length} words`);
        totalWordsScanned += words.length;

        // Check for loop bug (word 1 == word 9)
        if (words.length >= 9) {
            if (words[0].word === words[8].word) {
                loopBugFound.push({
                    module: moduleId,
                    word1: words[0].word,
                    word9: words[8].word
                });
            }
        }

        // Track all words
        words.forEach((item, idx) => {
            const word = item.word;

            // Check for filler text
            if (fillerPatterns.some(pattern => word.includes(pattern))) {
                fillersFound.push({ module: moduleId, word: word, index: idx + 1 });
            }

            // Track word occurrences
            if (!allWords.has(word)) {
                allWords.set(word, []);
            }
            allWords.get(word).push({ module: moduleId, index: idx + 1 });
        });
    }

    // A2 Modules (11-20)
    console.log('\n📚 Scanning A2 Modules (11-20)...');
    for (let i = 11; i <= 20; i++) {
        const moduleId = `fr_a2_m${i}`;
        const docRef = db.collection('languages').doc('french')
            .collection('levels').doc('a2')
            .collection('modules').doc(moduleId);

        const doc = await docRef.get();
        if (!doc.exists) {
            console.log(`❌ ${moduleId}: NOT FOUND`);
            continue;
        }

        const data = doc.data();
        const words = data.vocabularyItems || [];

        allModules.push({
            id: moduleId,
            level: 'A2',
            order: i,
            words: words,
            count: words.length
        });

        console.log(`   ✅ ${moduleId}: ${words.length} words`);
        totalWordsScanned += words.length;

        // Check for loop bug
        if (words.length >= 9) {
            if (words[0].word === words[8].word) {
                loopBugFound.push({
                    module: moduleId,
                    word1: words[0].word,
                    word9: words[8].word
                });
            }
        }

        // Track all words
        words.forEach((item, idx) => {
            const word = item.word;

            // Check for filler text
            if (fillerPatterns.some(pattern => word.includes(pattern))) {
                fillersFound.push({ module: moduleId, word: word, index: idx + 1 });
            }

            // Track word occurrences
            if (!allWords.has(word)) {
                allWords.set(word, []);
            }
            allWords.get(word).push({ module: moduleId, index: idx + 1 });
        });
    }

    // B1 Modules (21-30)
    console.log('\n📚 Scanning B1 Modules (21-30)...');
    for (let i = 21; i <= 30; i++) {
        const moduleId = `fr_b1_m${i}`;
        const docRef = db.collection('languages').doc('french')
            .collection('levels').doc('b1')
            .collection('modules').doc(moduleId);

        const doc = await docRef.get();
        if (!doc.exists) {
            console.log(`❌ ${moduleId}: NOT FOUND`);
            continue;
        }

        const data = doc.data();
        const words = data.vocabularyItems || [];

        allModules.push({
            id: moduleId,
            level: 'B1',
            order: i,
            words: words,
            count: words.length
        });

        console.log(`   ✅ ${moduleId}: ${words.length} words`);
        totalWordsScanned += words.length;

        // Check for loop bug
        if (words.length >= 9) {
            if (words[0].word === words[8].word) {
                loopBugFound.push({
                    module: moduleId,
                    word1: words[0].word,
                    word9: words[8].word
                });
            }
        }

        // Track all words
        words.forEach((item, idx) => {
            const word = item.word;

            // Check for filler text
            if (fillerPatterns.some(pattern => word.includes(pattern))) {
                fillersFound.push({ module: moduleId, word: word, index: idx + 1 });
            }

            // Track word occurrences
            if (!allWords.has(word)) {
                allWords.set(word, []);
            }
            allWords.get(word).push({ module: moduleId, index: idx + 1 });
        });
    }

    // Find duplicates across modules
    allWords.forEach((occurrences, word) => {
        if (occurrences.length > 1) {
            duplicatesAcrossModules.push({
                word: word,
                count: occurrences.length,
                locations: occurrences
            });
        }
    });

    // Generate Report
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('📊 AUDIT REPORT');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log(`✅ Total Modules Scanned: ${allModules.length}/30`);
    console.log(`✅ Total Words Scanned: ${totalWordsScanned}`);
    console.log(`✅ Total Unique Words: ${allWords.size}`);
    console.log(`✅ Number of Duplicates Found: ${duplicatesAcrossModules.length}\n`);

    // Loop Bug Report
    if (loopBugFound.length > 0) {
        console.log('❌ 9TH-WORD LOOP BUG DETECTED:');
        loopBugFound.forEach(bug => {
            console.log(`   ${bug.module}: Word #1 "${bug.word1}" === Word #9 "${bug.word9}"`);
        });
        console.log('');
    } else {
        console.log('✅ 9th-Word Loop Bug: NONE FOUND\n');
    }

    // Filler Text Report
    if (fillersFound.length > 0) {
        console.log('❌ FILLER TEXT DETECTED:');
        fillersFound.forEach(filler => {
            console.log(`   ${filler.module} [Word #${filler.index}]: "${filler.word}"`);
        });
        console.log('');
    } else {
        console.log('✅ Filler Text: NONE FOUND\n');
    }

    // Duplicates Report
    if (duplicatesAcrossModules.length > 0) {
        console.log('❌ DUPLICATES ACROSS MODULES:');
        duplicatesAcrossModules.slice(0, 20).forEach(dup => {
            console.log(`\n   Word: "${dup.word}" (appears ${dup.count} times)`);
            dup.locations.forEach(loc => {
                console.log(`      - ${loc.module} [Word #${loc.index}]`);
            });
        });
        if (duplicatesAcrossModules.length > 20) {
            console.log(`\n   ... and ${duplicatesAcrossModules.length - 20} more duplicates`);
        }
        console.log('');
    } else {
        console.log('✅ Cross-Module Duplicates: NONE FOUND\n');
    }

    // Visual Confirmation - Last 5 words of key modules
    console.log('═══════════════════════════════════════════════════════');
    console.log('👁️  VISUAL CONFIRMATION - Last 5 Words');
    console.log('═══════════════════════════════════════════════════════\n');

    const keyModules = [
        { id: 'fr_a1_m10', level: 'a1', name: 'A1 Module 10' },
        { id: 'fr_a2_m20', level: 'a2', name: 'A2 Module 20' },
        { id: 'fr_b1_m30', level: 'b1', name: 'B1 Module 30' }
    ];

    for (const key of keyModules) {
        const module = allModules.find(m => m.id === key.id);
        if (module && module.words.length >= 5) {
            const last5 = module.words.slice(-5);
            console.log(`${key.name} (${key.id}) - Last 5 words:`);
            last5.forEach((item, idx) => {
                console.log(`   ${module.words.length - 4 + idx}. ${item.word} - ${item.meaning}`);
            });
            console.log('');
        }
    }

    // Final Verdict
    console.log('═══════════════════════════════════════════════════════');
    const hasDuplicates = duplicatesAcrossModules.length > 0;
    const hasLoopBug = loopBugFound.length > 0;
    const hasFillers = fillersFound.length > 0;
    const isComplete = totalWordsScanned === 3000;

    if (!hasDuplicates && !hasLoopBug && !hasFillers && isComplete) {
        console.log('🎉 AUDIT RESULT: [PASS] ✅');
        console.log('═══════════════════════════════════════════════════════');
        console.log('✅ All 3,000 words are unique and clean');
        console.log('✅ No loop bugs detected');
        console.log('✅ No filler text detected');
        console.log('✅ Ready to proceed with Japanese curriculum');
    } else {
        console.log('❌ AUDIT RESULT: [FAIL] ⚠️');
        console.log('═══════════════════════════════════════════════════════');
        if (!isComplete) console.log(`❌ Expected 3000 words, found ${totalWordsScanned}`);
        if (hasDuplicates) console.log(`❌ Found ${duplicatesAcrossModules.length} duplicate words`);
        if (hasLoopBug) console.log(`❌ Found ${loopBugFound.length} modules with loop bug`);
        if (hasFillers) console.log(`❌ Found ${fillersFound.length} filler text instances`);
        console.log('⚠️  DO NOT proceed until issues are resolved');
    }
    console.log('═══════════════════════════════════════════════════════');
}

auditFrenchCurriculum()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
