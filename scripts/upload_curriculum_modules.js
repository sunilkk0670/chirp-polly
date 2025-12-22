// Upload all curriculum modules from curriculum_data.dart to Firestore
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

// Read curriculum data from the Dart file
const curriculumDataPath = path.join(__dirname, '../lib/features/curriculum/data/datasources/curriculum_data.dart');
const dartContent = fs.readFileSync(curriculumDataPath, 'utf8');

// Extract the curriculum data (this is a simplified parser)
// In production, you'd want a more robust parser or convert to JSON first
function parseCurriculumData() {
    // For now, we'll manually define the structure based on curriculum_data.dart
    // This matches the structure in your file

    const curricula = [
        {
            language: 'japanese',
            level: 'a1',
            modules: [
                {
                    id: 'jp_a1_m1',
                    theme: 'Greetings & Introductions',
                    order: 1,
                    lessons: [
                        { targetText: 'こんにちは', english: 'Hello / Good afternoon', phoneticTranscription: 'कोन्निचिवा', radicalBreakdown: null },
                        { targetText: '初めまして', english: 'Nice to meet you', phoneticTranscription: 'हाजिमेमाशिते', radicalBreakdown: '初 (Knife 刀 + Clothes 衣) / 面 (Face radical)' },
                        { targetText: 'おはようございます', english: 'Good morning (Polite)', phoneticTranscription: 'ओहायो गोज़ाइमासु', radicalBreakdown: '早 (Sun 日 + 十)' }
                    ],
                    liarGameData: {
                        trap: 'こんにちわ (Konnichi-wa with \'wa\' particle)',
                        correctVersion: 'こんにちは (Konnichi-wa with \'ha\' particle)',
                        explanation: 'Even though it sounds like \'wa\', the greeting \'Konnichiwa\' historically uses the topic particle \'ha\' (は).'
                    }
                },
                {
                    id: 'jp_a1_m2',
                    theme: 'Numbers & Counting',
                    order: 2,
                    lessons: [
                        { targetText: '一', english: 'One', phoneticTranscription: 'इची', radicalBreakdown: '一 (Horizontal line)' },
                        { targetText: '二', english: 'Two', phoneticTranscription: 'नी', radicalBreakdown: '二 (Two horizontal lines)' },
                        { targetText: '三', english: 'Three', phoneticTranscription: 'सान', radicalBreakdown: '三 (Three horizontal lines)' }
                    ],
                    liarGameData: {
                        trap: '四 pronounced as "yon" vs "shi"',
                        correctVersion: 'Both are correct but "yon" is preferred',
                        explanation: 'The number 4 can be pronounced as both "shi" and "yon", but "yon" is preferred because "shi" sounds like the word for death (死).'
                    }
                },
                {
                    id: 'jp_a1_m3',
                    theme: 'Family Members',
                    order: 3,
                    lessons: [
                        { targetText: '父', english: 'Father', phoneticTranscription: 'चिची', radicalBreakdown: '父 (Father radical)' },
                        { targetText: '母', english: 'Mother', phoneticTranscription: 'हाहा', radicalBreakdown: '母 (Mother radical)' },
                        { targetText: '兄', english: 'Older brother', phoneticTranscription: 'आनी', radicalBreakdown: '兄 (Mouth 口 + legs 儿)' }
                    ],
                    liarGameData: {
                        trap: 'Using お父さん for your own father',
                        correctVersion: 'Use 父 for your own father, お父さん for others\' fathers',
                        explanation: 'Japanese has different words for family members depending on whether you\'re talking about your own family or someone else\'s.'
                    }
                },
                {
                    id: 'jp_a1_m4',
                    theme: 'Food & Dining',
                    order: 4,
                    lessons: [
                        { targetText: 'ご飯', english: 'Rice / Meal', phoneticTranscription: 'गोहान', radicalBreakdown: '飯 (Food 食 + anti 反)' },
                        { targetText: '水', english: 'Water', phoneticTranscription: 'मिज़ु', radicalBreakdown: '水 (Water radical)' },
                        { targetText: 'お茶', english: 'Tea', phoneticTranscription: 'ओचा', radicalBreakdown: '茶 (Grass 艹 + tree 木)' }
                    ],
                    liarGameData: {
                        trap: 'Saying いただきます after eating',
                        correctVersion: 'Say いただきます before eating, ごちそうさまでした after',
                        explanation: 'いただきます is said before eating to express gratitude, while ごちそうさまでした is said after finishing the meal.'
                    }
                },
                {
                    id: 'jp_a1_m5',
                    theme: 'Daily Activities',
                    order: 5,
                    lessons: [
                        { targetText: '起きる', english: 'To wake up', phoneticTranscription: 'ओकिरु', radicalBreakdown: '起 (Run 走 + self 己)' },
                        { targetText: '寝る', english: 'To sleep', phoneticTranscription: 'नेरु', radicalBreakdown: '寝 (Roof 宀 + bed 寸)' },
                        { targetText: '食べる', english: 'To eat', phoneticTranscription: 'ताबेरु', radicalBreakdown: '食 (Food radical)' }
                    ],
                    liarGameData: {
                        trap: 'Using 食う instead of 食べる in polite conversation',
                        correctVersion: 'Use 食べる in polite contexts, 食う is very casual/rough',
                        explanation: '食う is a rough, casual way to say "eat" and should be avoided in polite conversation.'
                    }
                }
            ]
        },
        {
            language: 'hindi',
            level: 'a1',
            modules: [
                {
                    id: 'hi_a1_m1',
                    theme: 'Greetings & Introductions',
                    order: 1,
                    lessons: [
                        { targetText: 'नमस्ते', english: 'Hello / Greetings', phoneticTranscription: 'नमस्ते', radicalBreakdown: null },
                        { targetText: 'मेरा नाम', english: 'My name', phoneticTranscription: 'मेरा नाम', radicalBreakdown: null },
                        { targetText: 'आप कैसे हैं?', english: 'How are you?', phoneticTranscription: 'आप कैसे हैं?', radicalBreakdown: null }
                    ],
                    liarGameData: {
                        trap: 'Using तुम with elders or strangers',
                        correctVersion: 'Use आप for respect, तुम for friends/family',
                        explanation: 'Hindi has three levels of "you": तू (very informal), तुम (informal), and आप (formal/respectful). Always use आप with elders and strangers.'
                    }
                },
                {
                    id: 'hi_a1_m2',
                    theme: 'Numbers & Counting',
                    order: 2,
                    lessons: [
                        { targetText: 'एक', english: 'One', phoneticTranscription: 'एक', radicalBreakdown: null },
                        { targetText: 'दो', english: 'Two', phoneticTranscription: 'दो', radicalBreakdown: null },
                        { targetText: 'तीन', english: 'Three', phoneticTranscription: 'तीन', radicalBreakdown: null }
                    ],
                    liarGameData: {
                        trap: 'Confusing एक (one) with एक्का (ace)',
                        correctVersion: 'एक means one, एक्का is ace in cards',
                        explanation: 'While both words sound similar, एक is the number one, while एक्का refers to an ace in playing cards.'
                    }
                },
                {
                    id: 'hi_a1_m3',
                    theme: 'Family Members',
                    order: 3,
                    lessons: [
                        { targetText: 'पिता', english: 'Father', phoneticTranscription: 'पिता', radicalBreakdown: null },
                        { targetText: 'माता', english: 'Mother', phoneticTranscription: 'माता', radicalBreakdown: null },
                        { targetText: 'भाई', english: 'Brother', phoneticTranscription: 'भाई', radicalBreakdown: null }
                    ],
                    liarGameData: {
                        trap: 'Using पिता/माता in casual conversation',
                        correctVersion: 'Use पापा/मम्मी or बाबा/आई in casual speech',
                        explanation: 'पिता and माता are formal terms. In everyday conversation, people use पापा/मम्मी (Papa/Mummy) or regional variants.'
                    }
                },
                {
                    id: 'hi_a1_m4',
                    theme: 'Food & Dining',
                    order: 4,
                    lessons: [
                        { targetText: 'रोटी', english: 'Bread / Roti', phoneticTranscription: 'रोटी', radicalBreakdown: null },
                        { targetText: 'पानी', english: 'Water', phoneticTranscription: 'पानी', radicalBreakdown: null },
                        { targetText: 'चाय', english: 'Tea', phoneticTranscription: 'चाय', radicalBreakdown: null }
                    ],
                    liarGameData: {
                        trap: 'Saying धन्यवाद after every meal',
                        correctVersion: 'धन्यवाद is formal; casual thanks aren\'t always necessary',
                        explanation: 'While धन्यवाद (thank you) is polite, in family settings, it\'s not always used after meals. Context matters.'
                    }
                },
                {
                    id: 'hi_a1_m5',
                    theme: 'Daily Activities',
                    order: 5,
                    lessons: [
                        { targetText: 'उठना', english: 'To wake up', phoneticTranscription: 'उठना', radicalBreakdown: null },
                        { targetText: 'सोना', english: 'To sleep', phoneticTranscription: 'सोना', radicalBreakdown: null },
                        { targetText: 'खाना', english: 'To eat / Food', phoneticTranscription: 'खाना', radicalBreakdown: null }
                    ],
                    liarGameData: {
                        trap: 'Confusing खाना (to eat) with खाना (food)',
                        correctVersion: 'Context determines meaning: verb vs noun',
                        explanation: 'खाना can mean both "to eat" (verb) and "food" (noun). The context of the sentence determines which meaning is intended.'
                    }
                }
            ]
        },
        {
            language: 'french',
            level: 'a1',
            modules: [
                {
                    id: 'fr_a1_m1',
                    theme: 'Greetings & Introductions',
                    order: 1,
                    lessons: [
                        { targetText: 'Bonjour', english: 'Hello / Good day', phoneticTranscription: 'बोन्जूर', radicalBreakdown: null },
                        { targetText: 'Je m\'appelle', english: 'My name is', phoneticTranscription: 'झे माप्पेल', radicalBreakdown: null },
                        { targetText: 'Comment allez-vous?', english: 'How are you? (formal)', phoneticTranscription: 'कोमाँ ताले-वू?', radicalBreakdown: null }
                    ],
                    liarGameData: {
                        trap: 'Using "Bonjour" in the evening',
                        correctVersion: 'Use "Bonsoir" after 6 PM',
                        explanation: 'While "Bonjour" literally means "good day," it\'s only used until evening. After 6 PM, switch to "Bonsoir" (good evening).'
                    }
                },
                {
                    id: 'fr_a1_m2',
                    theme: 'Numbers & Counting',
                    order: 2,
                    lessons: [
                        { targetText: 'Un', english: 'One', phoneticTranscription: 'अँ', radicalBreakdown: null },
                        { targetText: 'Deux', english: 'Two', phoneticTranscription: 'दो', radicalBreakdown: null },
                        { targetText: 'Trois', english: 'Three', phoneticTranscription: 'त्रुआ', radicalBreakdown: null }
                    ],
                    liarGameData: {
                        trap: 'Pronouncing the "x" in "deux" and "six"',
                        correctVersion: 'Silent "x" in most contexts',
                        explanation: 'The "x" in numbers like "deux" (2) and "six" (6) is usually silent, unless followed by a vowel (liaison).'
                    }
                },
                {
                    id: 'fr_a1_m3',
                    theme: 'Family Members',
                    order: 3,
                    lessons: [
                        { targetText: 'Père', english: 'Father', phoneticTranscription: 'पेर', radicalBreakdown: null },
                        { targetText: 'Mère', english: 'Mother', phoneticTranscription: 'मेर', radicalBreakdown: null },
                        { targetText: 'Frère', english: 'Brother', phoneticTranscription: 'फ्रेर', radicalBreakdown: null }
                    ],
                    liarGameData: {
                        trap: 'Confusing "frère" (brother) with "fraise" (strawberry)',
                        correctVersion: 'Pay attention to pronunciation: frère vs fraise',
                        explanation: 'These words sound similar but mean completely different things. "Frère" has a closed "è" sound, while "fraise" has an "ai" diphthong.'
                    }
                },
                {
                    id: 'fr_a1_m4',
                    theme: 'Food & Dining',
                    order: 4,
                    lessons: [
                        { targetText: 'Pain', english: 'Bread', phoneticTranscription: 'पैं', radicalBreakdown: null },
                        { targetText: 'Eau', english: 'Water', phoneticTranscription: 'ओ', radicalBreakdown: null },
                        { targetText: 'Thé', english: 'Tea', phoneticTranscription: 'ते', radicalBreakdown: null }
                    ],
                    liarGameData: {
                        trap: 'Saying "Je suis plein" (I am full)',
                        correctVersion: 'Say "J\'ai bien mangé" (I ate well)',
                        explanation: '"Je suis plein" literally means "I am pregnant" (for animals) or "I am full" (like a container). Use "J\'ai bien mangé" or "Je n\'ai plus faim" instead.'
                    }
                },
                {
                    id: 'fr_a1_m5',
                    theme: 'Daily Activities',
                    order: 5,
                    lessons: [
                        { targetText: 'Se réveiller', english: 'To wake up', phoneticTranscription: 'से रेवेये', radicalBreakdown: null },
                        { targetText: 'Dormir', english: 'To sleep', phoneticTranscription: 'दोर्मीर', radicalBreakdown: null },
                        { targetText: 'Manger', english: 'To eat', phoneticTranscription: 'माँझे', radicalBreakdown: null }
                    ],
                    liarGameData: {
                        trap: 'Using "Je suis excité" for excitement',
                        correctVersion: 'Use "Je suis enthousiaste" or "content"',
                        explanation: '"Excité" in French has a sexual connotation. For general excitement, use "enthousiaste," "content," or "ravi" instead.'
                    }
                }
            ]
        }
    ];

    return curricula;
}

async function uploadModules() {
    console.log('🚀 Starting curriculum modules upload...\n');

    try {
        const curricula = parseCurriculumData();
        let totalModules = 0;
        let totalLessons = 0;

        for (const curriculum of curricula) {
            const { language, level, modules } = curriculum;

            console.log(`\n📚 Uploading ${language.toUpperCase()} ${level.toUpperCase()} modules...`);

            for (const module of modules) {
                // Upload module to Firestore
                await db.collection('languages')
                    .doc(language)
                    .collection('levels')
                    .doc(level)
                    .collection('modules')
                    .doc(module.id)
                    .set({
                        id: module.id,
                        theme: module.theme,
                        order: module.order,
                        lessons: module.lessons.map(lesson => ({
                            targetText: lesson.targetText,
                            english: lesson.english,
                            phoneticTranscription: lesson.phoneticTranscription,
                            radicalBreakdown: lesson.radicalBreakdown
                        })),
                        liarGameData: {
                            trap: module.liarGameData.trap,
                            correctVersion: module.liarGameData.correctVersion,
                            explanation: module.liarGameData.explanation
                        }
                    });

                console.log(`  ✅ Module ${module.order}: ${module.theme} (${module.lessons.length} lessons)`);
                totalModules++;
                totalLessons += module.lessons.length;
            }
        }

        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ UPLOAD COMPLETE!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`\n📊 Summary:`);
        console.log(`   • ${totalModules} modules uploaded`);
        console.log(`   • ${totalLessons} total lessons`);
        console.log(`   • 3 languages: Japanese, Hindi, French`);
        console.log(`   • All A1 level content`);
        console.log(`\n🌐 Check your Firestore Console:`);
        console.log(`   https://console.firebase.google.com/project/my-gift-pool/firestore/databases/-default-/data/~2Flanguages`);
        console.log('\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error uploading modules:', error);
        process.exit(1);
    }
}

// Run the upload
uploadModules();
