const fs = require('fs');
const path = require('path');

// Italian to English theme mapping
const themeTranslations = {
    // A1 Themes
    "Primi Passi": "First Steps",
    "Famiglia e Amici": "Family & Friends",
    "Vita Quotidiana": "Daily Life",
    "Tempo Libero & Luoghi": "Leisure & Places",
    "Casa & Shopping": "Home & Shopping",
    "Viaggi & Trasporti": "Travel & Transportation",
    "Cibo e Ristorante": "Food & Restaurant",
    "Clima e Natura": "Weather & Nature",
    "Società e Media": "Society & Media",
    "Revisione e Padronanza": "Review & Mastery",

    // A2 Themes
    "Relazioni e Vita Sociale": "Social Relationships",
    "Emozioni e Salute": "Emotions & Health",
    "Viaggi e Cultura": "Travel & Culture",
    "Lavoro e Carriera": "Work & Career",
    "Media e Tecnologia": "Media & Technology",
    "Società e Notizie": "Society & News",
    "Ambiente e Natura": "Environment & Nature",
    "Decisioni Quotidiane": "Daily Decisions",
    "Tempo Libero e Arti": "Leisure & Arts",

    // B1 Themes
    "Narrazione e Memoria": "Narration & Memory",
    "Opinioni e Convinzioni": "Opinions & Convictions",
    "Emozioni Complesse": "Complex Emotions"
};

function fixChineseThemes() {
    const dataDir = path.join(__dirname, '../firestore_data');
    const files = fs.readdirSync(dataDir).filter(f =>
        (f.startsWith('zh_a1_m') || f.startsWith('zh_a2_m') || f.startsWith('zh_b1_m')) &&
        f.endsWith('.json') &&
        !f.includes('modules')
    );

    let fixedCount = 0;
    let errors = [];

    files.forEach(file => {
        const filePath = path.join(dataDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const italianTheme = data.theme;
        const englishTheme = themeTranslations[italianTheme];

        if (!englishTheme) {
            errors.push(`⚠️  ${file}: No translation found for "${italianTheme}"`);
            return;
        }

        // Update theme
        data.theme = englishTheme;

        // Write back to file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');

        console.log(`✅ ${file}: "${italianTheme}" → "${englishTheme}"`);
        fixedCount++;
    });

    console.log(`\n📊 Summary:`);
    console.log(`   Fixed: ${fixedCount} modules`);
    if (errors.length > 0) {
        console.log(`   Errors: ${errors.length}`);
        errors.forEach(e => console.log(`   ${e}`));
    }
}

fixChineseThemes();
