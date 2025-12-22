import '../models/language_curriculum_model.dart';
import '../models/module_model.dart';
import '../models/lesson_model.dart';
import '../models/liar_game_model.dart';

/// Single Source of Truth for curriculum data
/// Transformed from curriculumData.ts
class CurriculumData {
  static final List<LanguageCurriculumModel> batch1Data = [
    // Japanese A1 Curriculum
    LanguageCurriculumModel(
      language: 'Japanese',
      level: 'A1',
      modules: [
        // Module 1: Greetings & Introductions
        ModuleModel(
          id: 'jp_a1_m1',
          theme: 'Greetings & Introductions',
          lessons: [
            LessonModel(
              targetText: 'こんにちは',
              english: 'Hello / Good afternoon',
              phoneticTranscription: 'कोन्निचिवा',
            ),
            LessonModel(
              targetText: '初めまして',
              english: 'Nice to meet you',
              phoneticTranscription: 'हाजिमेमाशिते',
              radicalBreakdown: '初 (Knife 刀 + Clothes 衣) / 面 (Face radical)',
            ),
            LessonModel(
              targetText: 'おはようございます',
              english: 'Good morning (Polite)',
              phoneticTranscription: 'ओहायो गोज़ाइमासु',
              radicalBreakdown: '早 (Sun 日 + 十)',
            ),
          ],
          liarGameData: LiarGameModel(
            trap: 'こんにちわ (Konnichi-wa with \'wa\' particle)',
            correctVersion: 'こんにちは (Konnichi-wa with \'ha\' particle)',
            explanation:
                'Even though it sounds like \'wa\', the greeting \'Konnichiwa\' historically uses the topic particle \'ha\' (は).',
          ),
        ),
        // Module 2: Numbers & Time
        ModuleModel(
          id: 'jp_a1_m2',
          theme: 'Numbers & Time',
          lessons: [
            LessonModel(
              targetText: '一, 二, 三, 四, 五',
              english: '1, 2, 3, 4, 5',
              phoneticTranscription: 'इचि, नि, सान, योन्, गो',
            ),
            LessonModel(
              targetText: '今、何時ですか？',
              english: 'What time is it now?',
              phoneticTranscription: 'इमा, नान्जी देसु का?',
              radicalBreakdown: '何 (Person 人 + 可) / 時 (Sun 日 + Temple 寺)',
            ),
          ],
          liarGameData: LiarGameModel(
            trap: '四 (Shi) is always used for time counting',
            correctVersion: 'Yo-ji (4 o\'clock)',
            explanation:
                'While 4 is \'Shi\' or \'Yon\', for 4 o\'clock, it is strictly \'Yo-ji\', never \'Shi-ji\' or \'Yon-ji\'.',
          ),
        ),
        // Module 3: Family & Relationships
        ModuleModel(
          id: 'jp_a1_m3',
          theme: 'Family & Relationships',
          lessons: [
            LessonModel(
              targetText: 'お父さん',
              english: 'Father',
              phoneticTranscription: 'ओतोसान्',
              radicalBreakdown: '父 (Stone axe/Father radical)',
            ),
            LessonModel(
              targetText: 'お母さん',
              english: 'Mother',
              phoneticTranscription: 'ओकासान्',
              radicalBreakdown: '母 (Mother/Breast radical)',
            ),
            LessonModel(
              targetText: '家族',
              english: 'Family',
              phoneticTranscription: 'काज़ोकू',
              radicalBreakdown: '家 (Roof 宀 + Pig 豕) / 族 (Flag + Arrow 矢)',
            ),
          ],
          liarGameData: LiarGameModel(
            trap: 'Using \'Otoosan\' for your own father when talking to others.',
            correctVersion: 'Chichi (Father)',
            explanation:
                'In Japanese, you use humble forms (Chichi/Haha) for your own family when speaking to outsiders, and honorific forms (Otoosan/Okaasan) for others\' families.',
          ),
        ),
        // Module 4: Food & Dining
        ModuleModel(
          id: 'jp_a1_m4',
          theme: 'Food & Dining',
          lessons: [
            LessonModel(
              targetText: 'いただきます',
              english: 'I humbly receive (Before meals)',
              phoneticTranscription: 'इतादाकिमासु',
            ),
            LessonModel(
              targetText: 'ご飯',
              english: 'Meal / Cooked rice',
              phoneticTranscription: 'गोहान्',
              radicalBreakdown: '飯 (Food 食 + Anti 反)',
            ),
            LessonModel(
              targetText: '美味しい',
              english: 'Delicious',
              phoneticTranscription: 'ओइशी',
              radicalBreakdown: '美 (Sheep 羊 + Big 大) / 味 (Mouth 口 + 未)',
            ),
          ],
          liarGameData: LiarGameModel(
            trap: 'Leaving chopsticks sticking vertically in a bowl of rice.',
            correctVersion: 'Resting chopsticks on a stand or the edge.',
            explanation:
                'Vertical chopsticks resemble incense at a funeral (tsukitate-bashi) and are a major taboo in Japanese culture.',
          ),
        ),
        // Module 5: Daily Routine
        ModuleModel(
          id: 'jp_a1_m5',
          theme: 'Daily Routine',
          lessons: [
            LessonModel(
              targetText: '六時に起きます',
              english: 'I wake up at 6 o\'clock',
              phoneticTranscription: 'रोकु-जी नी ओकीमासु',
              radicalBreakdown: '起 (Run 走 + Self 己)',
            ),
            LessonModel(
              targetText: '学校へ行きます',
              english: 'I go to school',
              phoneticTranscription: 'गाक्को ए इकिमासु',
              radicalBreakdown: '学 (Child 子 + Roof) / 校 (Tree 木 + 交) / 行 (Step 彳 + Step)',
            ),
          ],
          liarGameData: LiarGameModel(
            trap: 'Using \'He\' (へ) pronounced as \'He\' in \'Gakko he ikimasu\'.',
            correctVersion: 'Pronounced as \'E\' (Gakko e ikimasu).',
            explanation:
                'The character \'He\' (へ) is pronounced \'E\' when functioning as a directional particle.',
          ),
        ),
      ],
    ),
    
    // Hindi A1 Curriculum
    LanguageCurriculumModel(
      language: 'Hindi',
      level: 'A1',
      modules: [
        // Module 1: Greetings & Introductions
        ModuleModel(
          id: 'hi_a1_m1',
          theme: 'Greetings & Introductions',
          lessons: [
            LessonModel(
              targetText: 'नमस्ते',
              english: 'Hello / Namaste',
              phoneticTranscription: 'Namaste',
            ),
            LessonModel(
              targetText: 'आप कैसे हैं?',
              english: 'How are you? (Masculine/Formal)',
              phoneticTranscription: 'Aap kaise hain?',
            ),
            LessonModel(
              targetText: 'मेरा नाम ... है।',
              english: 'My name is ...',
              phoneticTranscription: 'Mera naam ... hai',
            ),
          ],
          liarGameData: LiarGameModel(
            trap: 'Using \'Tum kaise hai?\'',
            correctVersion: 'Tum kaise ho?',
            explanation:
                'The auxiliary verb \'hai\' is for singular/formal \'Aap\', while \'Tum\' requires \'ho\'.',
          ),
        ),
        // Module 2: Numbers & Time
        ModuleModel(
          id: 'hi_a1_m2',
          theme: 'Numbers & Time',
          lessons: [
            LessonModel(
              targetText: 'एक, दो, तीन, चार, पाँच',
              english: '1, 2, 3, 4, 5',
              phoneticTranscription: 'Ek, Do, Teen, Chaar, Paanch',
            ),
            LessonModel(
              targetText: 'कितने बजे हैं?',
              english: 'What time is it?',
              phoneticTranscription: 'Kitne baje hain?',
            ),
          ],
          liarGameData: LiarGameModel(
            trap: 'Ek baje hain (1 o\'clock plural)',
            correctVersion: 'Ek bajaa hai',
            explanation:
                '\'Ek\' is singular, so it uses \'bajaa hai\' instead of the plural \'baje hain\'.',
          ),
        ),
        // Module 3: Family & Relationships
        ModuleModel(
          id: 'hi_a1_m3',
          theme: 'Family & Relationships',
          lessons: [
            LessonModel(
              targetText: 'माता और पिता',
              english: 'Mother and Father',
              phoneticTranscription: 'Mata aur Pita',
            ),
            LessonModel(
              targetText: 'भाई और बहन',
              english: 'Brother and Sister',
              phoneticTranscription: 'Bhai aur Bahen',
            ),
          ],
          liarGameData: LiarGameModel(
            trap: 'Calling an elder brother by name only.',
            correctVersion: 'Name + Bhaiya',
            explanation:
                'In Indian culture, adding \'Bhaiya\' (brother) or \'Didi\' (sister) after the name is standard for elders to show respect.',
          ),
        ),
        // Module 4: Food & Dining
        ModuleModel(
          id: 'hi_a1_m4',
          theme: 'Food & Dining',
          lessons: [
            LessonModel(
              targetText: 'मुझे भूख लगी है।',
              english: 'I am hungry.',
              phoneticTranscription: 'Mujhe bhookh lagi hai',
            ),
            LessonModel(
              targetText: 'पानी पीजिए।',
              english: 'Please drink water.',
              phoneticTranscription: 'Paani peejiye',
            ),
          ],
          liarGameData: LiarGameModel(
            trap:
                'Mujhe khana khana hai (I want to eat food) - using \'hai\' incorrectly with female speakers.',
            correctVersion: 'Agreement stays same as \'Khana\' is masculine.',
            explanation:
                'Even if the speaker is female, \'khana\' is the object, so it doesn\'t change based on the speaker\'s gender here.',
          ),
        ),
        // Module 5: Daily Routine
        ModuleModel(
          id: 'hi_a1_m5',
          theme: 'Daily Routine',
          lessons: [
            LessonModel(
              targetText: 'मैं सोता हूँ।',
              english: 'I sleep. (Masculine)',
              phoneticTranscription: 'Main sota hoon',
            ),
            LessonModel(
              targetText: 'मैं सोती हूँ।',
              english: 'I sleep. (Feminine)',
              phoneticTranscription: 'Main soti hoon',
            ),
          ],
          liarGameData: LiarGameModel(
            trap: 'Main kaam karta hai.',
            correctVersion: 'Main kaam karta hoon.',
            explanation: 'The pronoun \'Main\' (I) always pairs with the auxiliary \'hoon\'.',
          ),
        ),
      ],
    ),
    
    // French A1 Curriculum
    LanguageCurriculumModel(
      language: 'French',
      level: 'A1',
      modules: [
        // Module 1: Greetings & Introductions
        ModuleModel(
          id: 'fr_a1_m1',
          theme: 'Greetings & Introductions',
          lessons: [
            LessonModel(
              targetText: 'Bonjour',
              english: 'Hello / Good morning',
              phoneticTranscription: 'Bon-zhoor',
            ),
            LessonModel(
              targetText: 'Comment ça va ?',
              english: 'How is it going?',
              phoneticTranscription: 'Ko-mon sa va',
            ),
            LessonModel(
              targetText: 'Enchanté',
              english: 'Delighted (Nice to meet you)',
              phoneticTranscription: 'On-shon-tay',
            ),
          ],
          liarGameData: LiarGameModel(
            trap: 'Salute (Ending with \'e\')',
            correctVersion: 'Salut',
            explanation:
                'English speakers often add a silent \'e\' like in \'Salute\', but the French greeting is \'Salut\' with a silent \'t\'.',
          ),
        ),
        // Module 2: Numbers & Time
        ModuleModel(
          id: 'fr_a1_m2',
          theme: 'Numbers & Time',
          lessons: [
            LessonModel(
              targetText: 'Un, deux, trois, quatre, cinq',
              english: '1, 2, 3, 4, 5',
              phoneticTranscription: 'Uh, deuh, trwa, katr, sank',
            ),
            LessonModel(
              targetText: 'Il est quelle heure ?',
              english: 'What time is it?',
              phoneticTranscription: 'Eel ay kel eur',
            ),
          ],
          liarGameData: LiarGameModel(
            trap: 'Il est huit heures (Pronouncing \'t\' in huit as silent)',
            correctVersion: 'Pronounced \'weet eur\' with liaison.',
            explanation:
                'Usually \'huit\' has a pronounced \'t\', and it creates a liaison with \'heures\'.',
          ),
        ),
        // Module 3: Family & Relationships
        ModuleModel(
          id: 'fr_a1_m3',
          theme: 'Family & Relationships',
          lessons: [
            LessonModel(
              targetText: 'Le père et la mère',
              english: 'The father and the mother',
              phoneticTranscription: 'Le pair ay la mair',
            ),
            LessonModel(
              targetText: 'Mon frère et ma sœur',
              english: 'My brother and my sister',
              phoneticTranscription: 'Mon frair ay ma seur',
            ),
          ],
          liarGameData: LiarGameModel(
            trap: 'Mon amie (My female friend) spelled \'Ma amie\'',
            correctVersion: 'Mon amie',
            explanation:
                'Even for feminine nouns, if they start with a vowel, you use \'Mon\' instead of \'Ma\' to avoid the vowel clash.',
          ),
        ),
        // Module 4: Food & Dining
        ModuleModel(
          id: 'fr_a1_m4',
          theme: 'Food & Dining',
          lessons: [
            LessonModel(
              targetText: 'Le pain et le fromage',
              english: 'Bread and cheese',
              phoneticTranscription: 'Le pan ay le fro-mazh',
            ),
            LessonModel(
              targetText: 'L\'addition, s\'il vous plaît',
              english: 'The bill, please',
              phoneticTranscription: 'La-dee-syon seel voo play',
            ),
          ],
          liarGameData: LiarGameModel(
            trap: 'Je suis faim (I am hunger)',
            correctVersion: 'J\'ai faim (I have hunger)',
            explanation:
                'In French, physiological states like hunger, thirst, or age use the verb \'avoir\' (to have), not \'être\' (to be).',
          ),
        ),
        // Module 5: Daily Routine
        ModuleModel(
          id: 'fr_a1_m5',
          theme: 'Daily Routine',
          lessons: [
            LessonModel(
              targetText: 'Je me réveille à 7h',
              english: 'I wake up at 7am',
              phoneticTranscription: 'Zhe me ray-vay à set eur',
            ),
            LessonModel(
              targetText: 'Je me douche',
              english: 'I shower',
              phoneticTranscription: 'Zhe me doosh',
            ),
          ],
          liarGameData: LiarGameModel(
            trap: 'Je réveille (I wake up someone else vs myself)',
            correctVersion: 'Je me réveille',
            explanation:
                'Reflexive verbs like \'se réveiller\' must include the pronoun \'me/te/se\' when the action is done to oneself.',
          ),
        ),
      ],
    ),
  ];
}
