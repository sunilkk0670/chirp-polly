/**
 * Comprehensive audit of English B1 modules
 * Verifies zero overlap with A1+A2 vocabulary
 */

const fs = require('fs');
const path = require('path');

const firestoreDataDir = path.join(__dirname, '..', 'firestore_data');

// Load A1+A2 exclusion list
const exclusionData = JSON.parse(
    fs.readFileSync(path.join(firestoreDataDir, 'en_a1_a2_exclusion_list.json'), 'utf8')
);
const exclusionSet = new Set(exclusionData.exclusionList);

console.log(`\n${'='.repeat(80)}`);
console.log('ENGLISH B1 CURRICULUM AUDIT');
console.log(`${'='.repeat(80)}\n`);

// Load all B1 modules
const b1Modules = [];
const b1Words = new Set();
const allB1WordDetails = [];
const overlaps = [];

for (let i = 1; i <= 10; i++) {
    const moduleNum = i.toString().padStart(2, '0');
    const filePath = path.join(firestoreDataDir, `en_b1_m${moduleNum}.json`);

    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        b1Modules.push(data);

        console.log(`📚 Module ${data.moduleId}: ${data.theme}`);
        console.log(`   Words: ${data.vocabularyItems.length}`);

        // Check each word
        data.vocabularyItems.forEach((item, index) => {
            const word = item.word.toLowerCase().trim();
            b1Words.add(word);

            allB1WordDetails.push({
                module: data.moduleId,
                theme: data.theme,
                word: item.word,
                phonetic: item.phonetic,
                usage: item.usage,
                usageWordCount: item.usage.split(/\s+/).length
            });

            // Check for overlap with A1+A2
            if (exclusionSet.has(word)) {
                overlaps.push({
                    word: item.word,
                    module: data.moduleId,
                    theme: data.theme
                });
            }
        });

        console.log(`   ✓ Processed\n`);
    }
}

console.log(`${'='.repeat(80)}`);
console.log('AUDIT RESULTS');
console.log(`${'='.repeat(80)}\n`);

console.log(`📊 Total B1 Words: ${b1Words.size}`);
console.log(`📊 Total A1+A2 Words: ${exclusionSet.size}`);
console.log(`📊 Overlaps Found: ${overlaps.length}\n`);

if (overlaps.length > 0) {
    console.log(`⚠️  WARNING: Found ${overlaps.length} overlapping words:\n`);
    overlaps.forEach(overlap => {
        console.log(`   - "${overlap.word}" in ${overlap.module} (${overlap.theme})`);
    });
} else {
    console.log(`✅ PERFECT! Zero overlaps with A1+A2 vocabulary!\n`);
}

// Verify IPA phonetics
console.log(`${'='.repeat(80)}`);
console.log('IPA PHONETICS VERIFICATION');
console.log(`${'='.repeat(80)}\n`);

const missingIPA = allB1WordDetails.filter(item => !item.phonetic || item.phonetic.trim() === '');
const invalidIPA = allB1WordDetails.filter(item =>
    item.phonetic && !item.phonetic.match(/^\/.*\/$/)
);

console.log(`✓ Words with IPA: ${allB1WordDetails.length - missingIPA.length}`);
console.log(`✗ Words missing IPA: ${missingIPA.length}`);
console.log(`⚠️  Words with invalid IPA format: ${invalidIPA.length}\n`);

// Verify usage example length (15-20 words)
console.log(`${'='.repeat(80)}`);
console.log('USAGE EXAMPLE LENGTH VERIFICATION');
console.log(`${'='.repeat(80)}\n`);

const tooShort = allB1WordDetails.filter(item => item.usageWordCount < 15);
const tooLong = allB1WordDetails.filter(item => item.usageWordCount > 20);
const perfect = allB1WordDetails.filter(item =>
    item.usageWordCount >= 15 && item.usageWordCount <= 20
);

console.log(`✓ Perfect length (15-20 words): ${perfect.length}`);
console.log(`✗ Too short (<15 words): ${tooShort.length}`);
console.log(`✗ Too long (>20 words): ${tooLong.length}\n`);

if (tooShort.length > 0) {
    console.log(`⚠️  Examples that are too short:\n`);
    tooShort.slice(0, 5).forEach(item => {
        console.log(`   - "${item.word}" (${item.usageWordCount} words): ${item.usage.substring(0, 60)}...`);
    });
    if (tooShort.length > 5) {
        console.log(`   ... and ${tooShort.length - 5} more\n`);
    }
}

if (tooLong.length > 0) {
    console.log(`⚠️  Examples that are too long:\n`);
    tooLong.slice(0, 5).forEach(item => {
        console.log(`   - "${item.word}" (${item.usageWordCount} words): ${item.usage.substring(0, 60)}...`);
    });
    if (tooLong.length > 5) {
        console.log(`   ... and ${tooLong.length - 5} more\n`);
    }
}

// Generate verification tables
console.log(`${'='.repeat(80)}`);
console.log('GENERATING VERIFICATION TABLES');
console.log(`${'='.repeat(80)}\n`);

const verificationReport = {
    summary: {
        totalB1Words: b1Words.size,
        totalA1A2Words: exclusionSet.size,
        overlapsFound: overlaps.length,
        modulesGenerated: b1Modules.length,
        perfectIPACount: allB1WordDetails.length - missingIPA.length - invalidIPA.length,
        perfectUsageLengthCount: perfect.length
    },
    modules: b1Modules.map(m => ({
        moduleId: m.moduleId,
        theme: m.theme,
        wordCount: m.vocabularyItems.length,
        sampleWords: m.vocabularyItems.slice(0, 10).map(item => ({
            word: item.word,
            phonetic: item.phonetic,
            usageWordCount: item.usage.split(/\s+/).length,
            usage: item.usage
        }))
    })),
    overlaps: overlaps,
    qualityIssues: {
        missingIPA: missingIPA.map(item => ({ word: item.word, module: item.module })),
        invalidIPA: invalidIPA.map(item => ({ word: item.word, phonetic: item.phonetic, module: item.module })),
        tooShortUsage: tooShort.map(item => ({ word: item.word, wordCount: item.usageWordCount, module: item.module })),
        tooLongUsage: tooLong.map(item => ({ word: item.word, wordCount: item.usageWordCount, module: item.module }))
    }
};

const reportPath = path.join(firestoreDataDir, 'en_b1_audit_report.json');
fs.writeFileSync(reportPath, JSON.stringify(verificationReport, null, 2));

console.log(`✅ Verification report saved to: ${reportPath}\n`);

// Generate markdown verification tables
let markdown = `# English B1 Curriculum Verification Report\n\n`;
markdown += `Generated: ${new Date().toISOString()}\n\n`;
markdown += `## Summary\n\n`;
markdown += `| Metric | Count |\n`;
markdown += `|--------|-------|\n`;
markdown += `| Total B1 Words | ${verificationReport.summary.totalB1Words} |\n`;
markdown += `| Total A1+A2 Words | ${verificationReport.summary.totalA1A2Words} |\n`;
markdown += `| **Overlaps Found** | **${verificationReport.summary.overlapsFound}** |\n`;
markdown += `| Modules Generated | ${verificationReport.summary.modulesGenerated} |\n`;
markdown += `| Words with Valid IPA | ${verificationReport.summary.perfectIPACount} |\n`;
markdown += `| Perfect Usage Length (15-20 words) | ${verificationReport.summary.perfectUsageLengthCount} |\n\n`;

markdown += `## Module Overview\n\n`;
markdown += `| Module ID | Theme | Word Count |\n`;
markdown += `|-----------|-------|------------|\n`;
verificationReport.modules.forEach(m => {
    markdown += `| ${m.moduleId} | ${m.theme} | ${m.wordCount} |\n`;
});
markdown += `\n`;

if (overlaps.length > 0) {
    markdown += `## ⚠️ Overlap Audit (CRITICAL)\n\n`;
    markdown += `Found ${overlaps.length} words that overlap with A1+A2:\n\n`;
    markdown += `| Word | Module | Theme |\n`;
    markdown += `|------|--------|-------|\n`;
    overlaps.forEach(overlap => {
        markdown += `| ${overlap.word} | ${overlap.module} | ${overlap.theme} |\n`;
    });
    markdown += `\n`;
} else {
    markdown += `## ✅ Overlap Audit\n\n`;
    markdown += `**PERFECT!** Zero overlaps found with A1+A2 vocabulary (${exclusionSet.size} words).\n\n`;
}

markdown += `## Sample Words from Each Module\n\n`;
verificationReport.modules.forEach(m => {
    markdown += `### ${m.moduleId}: ${m.theme}\n\n`;
    markdown += `| Word | IPA | Usage (Word Count) |\n`;
    markdown += `|------|-----|--------------------|\n`;
    m.sampleWords.forEach(item => {
        markdown += `| ${item.word} | ${item.phonetic} | ${item.usage.substring(0, 50)}... (${item.usageWordCount}) |\n`;
    });
    markdown += `\n`;
});

const markdownPath = path.join(
    __dirname,
    '..',
    '.gemini',
    'antigravity',
    'brain',
    '258290b2-4e3f-45b3-a3e0-d3611a1bdee8',
    'verification_tables.md'
);

fs.mkdirSync(path.dirname(markdownPath), { recursive: true });
fs.writeFileSync(markdownPath, markdown);

console.log(`✅ Markdown verification tables saved to: verification_tables.md\n`);

console.log(`${'='.repeat(80)}`);
console.log('AUDIT COMPLETE');
console.log(`${'='.repeat(80)}\n`);

// Exit with appropriate code
if (overlaps.length > 0 || missingIPA.length > 0 || tooShort.length > 0 || tooLong.length > 0) {
    console.log(`⚠️  Audit completed with warnings. Please review the issues above.\n`);
    process.exit(1);
} else {
    console.log(`✅ All checks passed! B1 curriculum is ready.\n`);
    process.exit(0);
}
