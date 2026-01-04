/**
 * Correction Batch Script for English B1 Modules
 * Replaces 64 overlapping words and adds 15 missing words
 */

const fs = require('fs');
const path = require('path');

const firestoreDataDir = path.join(__dirname, '..', 'firestore_data');

// Complete replacement mapping for all 64 overlapping words
const replacements = {
    // Module 01: Workplace (18 overlaps + 3 new words = 21 changes)
    'en_b1_m01': {
        'negotiate': { word: 'arbitrate', phonetic: '/ˈɑːrbɪtreɪt/', usage: 'The mediator will arbitrate the labor dispute between management and union representatives to reach a fair agreement.' },
        'coordinate': { word: 'orchestrate', phonetic: '/ˈɔːrkɪstreɪt/', usage: 'The project manager must orchestrate multiple teams across different time zones to ensure successful product delivery.' },
        'collaborate': { word: 'synergize', phonetic: '/ˈsɪnərdʒaɪz/', usage: 'Different departments need to synergize their efforts to maximize efficiency and achieve the company\'s strategic objectives.' },
        'procedure': { word: 'methodology', phonetic: '/ˌmeθəˈdɑːlədʒi/', usage: 'The research team developed a comprehensive methodology for collecting and analyzing data from multiple sources systematically.' },
        'franchise': { word: 'concession', phonetic: '/kənˈseʃən/', usage: 'The airport granted a concession to operate retail stores in the terminal for the next decade.' },
        'expertise': { word: 'specialization', phonetic: '/ˌspeʃələˈzeɪʃən/', usage: 'Her specialization in cybersecurity made her the ideal candidate for leading the company\'s digital protection initiatives.' },
        'proficiency': { word: 'mastery', phonetic: '/ˈmæstəri/', usage: 'Achieving mastery in a foreign language requires years of dedicated practice and immersion in authentic contexts.' },
        'competence': { word: 'capability', phonetic: '/ˌkeɪpəˈbɪləti/', usage: 'The team demonstrated exceptional capability in handling complex technical challenges under tight deadlines and pressure consistently.' },
        'qualification': { word: 'accreditation', phonetic: '/əˌkredɪˈteɪʃən/', usage: 'Professional accreditation from recognized institutions significantly enhances career prospects and credibility in the industry worldwide.' },
        'analytics': { word: 'metrics', phonetic: '/ˈmetrɪks/', usage: 'The marketing department uses various metrics to measure campaign effectiveness and return on investment accurately.' },
        'forecast': { word: 'projection', phonetic: '/prəˈdʒekʃən/', usage: 'Financial projections for the next quarter indicate steady growth despite current economic uncertainties and challenges.' },
        'projection': { word: 'estimation', phonetic: '/ˌestɪˈmeɪʃən/', usage: 'The cost estimation for the construction project was carefully calculated based on current material prices.' },
        'strategy': { word: 'blueprint', phonetic: '/ˈbluːprɪnt/', usage: 'The executive team developed a detailed blueprint for expanding operations into emerging markets over five years.' },
        'objective': { word: 'milestone', phonetic: '/ˈmaɪlstoʊn/', usage: 'Reaching the sales milestone of one million units was a significant achievement for the company.' },
        'initiative': { word: 'endeavor', phonetic: '/ɪnˈdevər/', usage: 'The sustainability endeavor aims to reduce carbon emissions by fifty percent within the next three years.' },
        'proposal': { word: 'specification', phonetic: '/ˌspesɪfɪˈkeɪʃən/', usage: 'The technical team will draft a detailed specification to outline all the necessary project requirements clearly.' },
        'workshop': { word: 'symposium', phonetic: '/sɪmˈpoʊziəm/', usage: 'Industry experts gathered at the annual symposium to discuss emerging trends and share best practices.' },
        'archive': { word: 'repository', phonetic: '/rɪˈpɑːzətɔːri/', usage: 'The digital repository stores all historical documents and records for easy retrieval and long-term preservation.' },
        // 3 new words to reach 100
        'NEW_1': { word: 'synergy', phonetic: '/ˈsɪnərdʒi/', usage: 'The synergy between sales and marketing teams resulted in a highly successful product launch campaign.' },
        'NEW_2': { word: 'leverage', phonetic: '/ˈlevərɪdʒ/', usage: 'Companies can leverage social media platforms to build brand awareness and engage directly with customers.' },
        'NEW_3': { word: 'optimize', phonetic: '/ˈɑːptɪmaɪz/', usage: 'The operations team worked to optimize supply chain processes reducing costs while improving delivery times.' }
    },

    // Module 02: Global Issues (16 overlaps + 3 new words = 19 changes)
    'en_b1_m02': {
        'sustainability': { word: 'viability', phonetic: '/ˌvaɪəˈbɪləti/', usage: 'The long-term viability of renewable energy projects depends on technological innovation and supportive government policies.' },
        'renewable': { word: 'sustainable', phonetic: '/səˈsteɪnəbəl/', usage: 'Sustainable agriculture practices help preserve soil quality while producing sufficient food for growing populations worldwide.' },
        'pollution': { word: 'contamination', phonetic: '/kənˌtæmɪˈneɪʃən/', usage: 'Water contamination from industrial waste poses serious health risks to communities living near manufacturing facilities.' },
        'deforestation': { word: 'desertification', phonetic: '/dɪˌzɜːrtɪfɪˈkeɪʃən/', usage: 'Desertification threatens agricultural productivity in regions where climate change and poor land management practices converge.' },
        'refugee': { word: 'displaced', phonetic: '/dɪsˈpleɪst/', usage: 'Millions of displaced people seek safety and shelter after fleeing conflict zones and natural disasters.' },
        'mediation': { word: 'arbitration', phonetic: '/ˌɑːrbɪˈtreɪʃən/', usage: 'International arbitration provides a neutral forum for resolving disputes between nations without resorting to violence.' },
        'reconciliation': { word: 'rapprochement', phonetic: '/ˌræproʊʃˈmɑːn/', usage: 'The diplomatic rapprochement between the two countries marked the beginning of improved relations after decades.' },
        'compensation': { word: 'indemnity', phonetic: '/ɪnˈdemnəti/', usage: 'The insurance company paid indemnity to victims of the industrial accident covering medical expenses and losses.' },
        'resilience': { word: 'fortitude', phonetic: '/ˈfɔːrtɪtuːd/', usage: 'Communities demonstrated remarkable fortitude rebuilding their lives after devastating natural disasters destroyed their homes completely.' },
        'emergency': { word: 'contingency', phonetic: '/kənˈtɪndʒənsi/', usage: 'The government activated contingency plans to respond swiftly to the public health crisis and protect citizens.' },
        'aid': { word: 'assistance', phonetic: '/əˈsɪstəns/', usage: 'International assistance arrived quickly providing food, water, and medical supplies to earthquake survivors in remote areas.' },
        'volunteer': { word: 'advocate', phonetic: '/ˈædvəkət/', usage: 'Environmental advocates work tirelessly to raise awareness about climate change and promote sustainable living practices.' },
        'protest': { word: 'demonstration', phonetic: '/ˌdemənˈstreɪʃən/', usage: 'Peaceful demonstrations filled city streets as citizens exercised their democratic right to voice concerns publicly.' },
        'petition': { word: 'referendum', phonetic: '/ˌrefəˈrendəm/', usage: 'The national referendum allowed citizens to vote directly on the proposed constitutional amendments and reforms.' },
        'alliance': { word: 'consortium', phonetic: '/kənˈsɔːrtiəm/', usage: 'A consortium of universities collaborated on groundbreaking research to develop innovative solutions for global challenges.' },
        'partnership': { word: 'collaboration', phonetic: '/kəˌlæbəˈreɪʃən/', usage: 'The public-private collaboration brought together government agencies and businesses to address infrastructure needs effectively.' },
        // 3 new words to reach 100
        'NEW_1': { word: 'hegemony', phonetic: '/hɪˈdʒeməni/', usage: 'Regional hegemony shifted as emerging economies gained influence in international trade and diplomatic affairs significantly.' },
        'NEW_2': { word: 'sovereignty', phonetic: '/ˈsɑːvrənti/', usage: 'National sovereignty gives countries the right to govern themselves without external interference from other powers.' },
        'NEW_3': { word: 'proliferation', phonetic: '/prəˌlɪfəˈreɪʃən/', usage: 'The proliferation of nuclear weapons remains a major concern for international security and global peace efforts.' }
    },

    // Module 03: Well-being (18 overlaps + 5 new words = 23 changes)
    'en_b1_m03': {
        'stress': { word: 'tension', phonetic: '/ˈtenʃən/', usage: 'Chronic tension in the workplace can lead to burnout if employees do not practice effective management.' },
        'nutrition': { word: 'nourishment', phonetic: '/ˈnɜːrɪʃmənt/', usage: 'Proper nourishment provides the body with essential nutrients needed for optimal health and sustained energy levels.' },
        'meditation': { word: 'contemplation', phonetic: '/ˌkɑːntəmˈpleɪʃən/', usage: 'Daily contemplation helps individuals develop self-awareness and find inner peace amidst the chaos of life.' },
        'yoga': { word: 'pilates', phonetic: '/pɪˈlɑːtiːz/', usage: 'Pilates exercises strengthen core muscles and improve posture through controlled movements and focused breathing techniques.' },
        'wellness': { word: 'wellbeing', phonetic: '/ˈwelˌbiːɪŋ/', usage: 'Employee wellbeing programs focus on physical health, mental health, and work-life balance to boost productivity.' },
        'flexibility': { word: 'adaptability', phonetic: '/əˌdæptəˈbɪləti/', usage: 'Adaptability in changing circumstances is crucial for maintaining mental health and navigating life\'s unexpected challenges.' },
        'coordination': { word: 'synchronization', phonetic: '/ˌsɪŋkrənaɪˈzeɪʃən/', usage: 'Proper synchronization between mind and body improves athletic performance and reduces the risk of injuries.' },
        'vitamin': { word: 'nutrient', phonetic: '/ˈnuːtriənt/', usage: 'Essential nutrients from fruits and vegetables support immune function and promote overall health and longevity.' },
        'resilience': { word: 'tenacity', phonetic: '/təˈnæsəti/', usage: 'Mental tenacity helps people overcome obstacles and maintain focus on long-term goals despite temporary setbacks.' },
        'harmony': { word: 'equilibrium', phonetic: '/ˌiːkwɪˈlɪbriəm/', usage: 'Achieving equilibrium between work responsibilities and personal life requires conscious effort and clear boundaries consistently.' },
        'perseverance': { word: 'persistence', phonetic: '/pərˈsɪstəns/', usage: 'Persistence in pursuing fitness goals leads to lasting results and improved health outcomes over time.' },
        'commitment': { word: 'devotion', phonetic: '/dɪˈvoʊʃən/', usage: 'Devotion to personal growth involves continuous learning and willingness to step outside comfort zones regularly.' },
        'dedication': { word: 'diligence', phonetic: '/ˈdɪlɪdʒəns/', usage: 'Diligence in maintaining healthy habits creates a strong foundation for long-term wellness and disease prevention.' },
        'passion': { word: 'zeal', phonetic: '/ziːl/', usage: 'Her zeal for helping others inspired many people to volunteer and contribute to community service.' },
        'aspiration': { word: 'ambition', phonetic: '/æmˈbɪʃən/', usage: 'Healthy ambition drives individuals to set challenging goals while maintaining ethical standards and respecting others.' },
        'anticipation': { word: 'expectation', phonetic: '/ˌekspekˈteɪʃən/', usage: 'Managing expectations helps prevent disappointment and allows appreciation for outcomes even when they differ from plans.' },
        'hope': { word: 'optimism', phonetic: '/ˈɑːptɪmɪzəm/', usage: 'Maintaining optimism during difficult times is essential for achieving long-term mental health and emotional balance.' },
        'trust': { word: 'reliance', phonetic: '/rɪˈlaɪəns/', usage: 'Building reliance in relationships requires honesty, consistency, and actions that demonstrate care and respect always.' },
        // 5 new words to reach 100
        'NEW_1': { word: 'rejuvenation', phonetic: '/rɪˌdʒuːvəˈneɪʃən/', usage: 'A weekend retreat in nature provided much-needed rejuvenation allowing her to return refreshed and energized.' },
        'NEW_2': { word: 'serenity', phonetic: '/səˈrenəti/', usage: 'Finding serenity in daily life requires letting go of things beyond our control and accepting circumstances.' },
        'NEW_3': { word: 'tranquility', phonetic: '/træŋˈkwɪləti/', usage: 'The tranquility of the mountain retreat provided a perfect escape from the noise and chaos.' },
        'NEW_4': { word: 'composure', phonetic: '/kəmˈpoʊʒər/', usage: 'Maintaining composure under pressure demonstrates emotional maturity and helps others remain calm during crises effectively.' },
        'NEW_5': { word: 'fortitude', phonetic: '/ˈfɔːrtɪtuːd/', usage: 'Her fortitude in facing adversity inspired everyone around her to persevere through their own challenges.' }
    },

    // Module 04: Culture (12 overlaps + 4 new words = 16 changes)
    'en_b1_m04': {
        'novel': { word: 'chronicle', phonetic: '/ˈkrɑːnɪkəl/', usage: 'The historical chronicle documented major events spanning three centuries of the empire\'s rise and fall.' },
        'theater': { word: 'auditorium', phonetic: '/ˌɔːdɪˈtɔːriəm/', usage: 'The grand auditorium hosted prestigious performances attracting audiences from across the country for cultural events.' },
        'performance': { word: 'recital', phonetic: '/rɪˈsaɪtəl/', usage: 'The piano recital showcased the young musician\'s exceptional talent and years of dedicated practice beautifully.' },
        'resolution': { word: 'denouement', phonetic: '/ˌdeɪnuːˈmɑːn/', usage: 'The story\'s denouement revealed surprising connections between characters and tied up all the loose narrative threads.' },
        'genre': { word: 'category', phonetic: '/ˈkætəɡɔːri/', usage: 'Science fiction is a popular literary category that explores futuristic technology and its impact on society.' },
        'comedy': { word: 'farce', phonetic: '/fɑːrs/', usage: 'The theatrical farce used exaggerated situations and physical humor to entertain audiences and provoke laughter.' },
        'drama': { word: 'melodrama', phonetic: '/ˈmelədrɑːmə/', usage: 'Victorian melodrama featured heightened emotions and clear moral distinctions between good and evil characters throughout.' },
        'landmark': { word: 'monument', phonetic: '/ˈmɑːnjumənt/', usage: 'The ancient monument serves as a reminder of important historical events and preserves collective memory.' },
        'preservation': { word: 'safeguarding', phonetic: '/ˈseɪfɡɑːrdɪŋ/', usage: 'Safeguarding cultural heritage requires dedicated efforts to protect important sites from destruction and natural deterioration.' },
        'conservation': { word: 'curation', phonetic: '/kjʊˈreɪʃən/', usage: 'Museum curation involves selecting and arranging artworks to tell compelling stories through thoughtful visual displays.' },
        'collection': { word: 'anthology', phonetic: '/ænˈθɑːlədʒi/', usage: 'The poetry anthology featured works from diverse voices representing different cultures and historical periods comprehensively.' },
        'perspective': { word: 'viewpoint', phonetic: '/ˈvjuːpɔɪnt/', usage: 'Understanding different cultural viewpoints enriches our appreciation of art and broadens our worldview significantly always.' },
        // 4 new words to reach 100
        'NEW_1': { word: 'renaissance', phonetic: '/rəˈneɪsəns/', usage: 'The neighborhood is experiencing a cultural renaissance with new galleries, theaters, and creative spaces opening.' },
        'NEW_2': { word: 'patronage', phonetic: '/ˈpeɪtrənɪdʒ/', usage: 'Royal patronage supported artists and musicians allowing them to create masterpieces without financial worries or constraints.' },
        'NEW_3': { word: 'virtuoso', phonetic: '/ˌvɜːrtʃuˈoʊsoʊ/', usage: 'The virtuoso violinist captivated audiences worldwide with breathtaking technical skill and profound emotional expression consistently.' },
        'NEW_4': { word: 'aesthetic', phonetic: '/esˈθetɪk/', usage: 'The building\'s aesthetic combines modern minimalism with traditional elements creating a unique and appealing style.' }
    }
};

console.log('\n' + '='.repeat(80));
console.log('ENGLISH B1 CORRECTION BATCH');
console.log('='.repeat(80) + '\n');

// Process each module
Object.keys(replacements).forEach(moduleId => {
    const filePath = path.join(firestoreDataDir, `${moduleId}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log(`Processing ${moduleId}: ${data.theme}`);

    const moduleReplacements = replacements[moduleId];
    let replacedCount = 0;
    let addedCount = 0;

    // Replace existing words
    data.vocabularyItems = data.vocabularyItems.map(item => {
        const replacement = moduleReplacements[item.word];
        if (replacement) {
            replacedCount++;
            return {
                word: replacement.word,
                phonetic: replacement.phonetic,
                usage: replacement.usage
            };
        }
        return item;
    });

    // Add new words
    Object.keys(moduleReplacements).forEach(key => {
        if (key.startsWith('NEW_')) {
            const newWord = moduleReplacements[key];
            data.vocabularyItems.push({
                word: newWord.word,
                phonetic: newWord.phonetic,
                usage: newWord.usage
            });
            addedCount++;
        }
    });

    // Save updated module
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log(`  ✓ Replaced: ${replacedCount} words`);
    console.log(`  ✓ Added: ${addedCount} new words`);
    console.log(`  ✓ Total: ${data.vocabularyItems.length} words\n`);
});

console.log('='.repeat(80));
console.log('CORRECTION BATCH COMPLETE');
console.log('='.repeat(80) + '\n');
