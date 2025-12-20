
import { BatchData } from './types';

export const BATCH_1_DATA: BatchData = [
  {
    "language": "Japanese",
    "level": "A1",
    "modules": [
      {
        "id": "jp_a1_m1",
        "theme": "Greetings & Introductions",
        "lessons": [
          {
            "target_text": "こんにちは",
            "english": "Hello / Good afternoon",
            "phonetic_transcription": "कोन्निचिवा"
          },
          {
            "target_text": "初めまして",
            "english": "Nice to meet you",
            "phonetic_transcription": "हाजिमेमाशिते",
            "radical_breakdown": "初 (Knife 刀 + Clothes 衣) / 面 (Face radical)"
          },
          {
            "target_text": "おはようございます",
            "english": "Good morning (Polite)",
            "phonetic_transcription": "ओहायो गोज़ाइमासु",
            "radical_breakdown": "早 (Sun 日 + 十)"
          }
        ],
        "liar_game_data": {
          "trap": "こんにちわ (Konnichi-wa with 'wa' particle)",
          "correct_version": "こんにちは (Konnichi-wa with 'ha' particle)",
          "explanation": "Even though it sounds like 'wa', the greeting 'Konnichiwa' historically uses the topic particle 'ha' (は)."
        }
      },
      {
        "id": "jp_a1_m2",
        "theme": "Numbers & Time",
        "lessons": [
          {
            "target_text": "一, 二, 三, 四, 五",
            "english": "1, 2, 3, 4, 5",
            "phonetic_transcription": "इचि, नि, सान, योन्, गो"
          },
          {
            "target_text": "今、何時ですか？",
            "english": "What time is it now?",
            "phonetic_transcription": "इमा, नान्जी देसु का?",
            "radical_breakdown": "何 (Person 人 + 可) / 時 (Sun 日 + Temple 寺)"
          }
        ],
        "liar_game_data": {
          "trap": "四 (Shi) is always used for time counting",
          "correct_version": "Yo-ji (4 o'clock)",
          "explanation": "While 4 is 'Shi' or 'Yon', for 4 o'clock, it is strictly 'Yo-ji', never 'Shi-ji' or 'Yon-ji'."
        }
      },
      {
        "id": "jp_a1_m3",
        "theme": "Family & Relationships",
        "lessons": [
          {
            "target_text": "お父さん",
            "english": "Father",
            "phonetic_transcription": "ओतोसान्",
            "radical_breakdown": "父 (Stone axe/Father radical)"
          },
          {
            "target_text": "お母さん",
            "english": "Mother",
            "phonetic_transcription": "ओकासान्",
            "radical_breakdown": "母 (Mother/Breast radical)"
          },
          {
            "target_text": "家族",
            "english": "Family",
            "phonetic_transcription": "काज़ोकू",
            "radical_breakdown": "家 (Roof 宀 + Pig 豕) / 族 (Flag + Arrow 矢)"
          }
        ],
        "liar_game_data": {
          "trap": "Using 'Otoosan' for your own father when talking to others.",
          "correct_version": "Chichi (Father)",
          "explanation": "In Japanese, you use humble forms (Chichi/Haha) for your own family when speaking to outsiders, and honorific forms (Otoosan/Okaasan) for others' families."
        }
      },
      {
        "id": "jp_a1_m4",
        "theme": "Food & Dining",
        "lessons": [
          {
            "target_text": "いただきます",
            "english": "I humbly receive (Before meals)",
            "phonetic_transcription": "इतादाकिमासु"
          },
          {
            "target_text": "ご飯",
            "english": "Meal / Cooked rice",
            "phonetic_transcription": "गोहान्",
            "radical_breakdown": "飯 (Food 食 + Anti 反)"
          },
          {
            "target_text": "美味しい",
            "english": "Delicious",
            "phonetic_transcription": "ओइशी",
            "radical_breakdown": "美 (Sheep 羊 + Big 大) / 味 (Mouth 口 + 未)"
          }
        ],
        "liar_game_data": {
          "trap": "Leaving chopsticks sticking vertically in a bowl of rice.",
          "correct_version": "Resting chopsticks on a stand or the edge.",
          "explanation": "Vertical chopsticks resemble incense at a funeral (tsukitate-bashi) and are a major taboo in Japanese culture."
        }
      },
      {
        "id": "jp_a1_m5",
        "theme": "Daily Routine",
        "lessons": [
          {
            "target_text": "六時に起きます",
            "english": "I wake up at 6 o'clock",
            "phonetic_transcription": "रोकु-जी नी ओकीमासु",
            "radical_breakdown": "起 (Run 走 + Self 己)"
          },
          {
            "target_text": "学校へ行きます",
            "english": "I go to school",
            "phonetic_transcription": "गाक्को ए इकिमासु",
            "radical_breakdown": "学 (Child 子 + Roof) / 校 (Tree 木 + 交) / 行 (Step 彳 + Step)"
          }
        ],
        "liar_game_data": {
          "trap": "Using 'He' (へ) pronounced as 'He' in 'Gakko he ikimasu'.",
          "correct_version": "Pronounced as 'E' (Gakko e ikimasu).",
          "explanation": "The character 'He' (へ) is pronounced 'E' when functioning as a directional particle."
        }
      }
    ]
  },
  {
    "language": "Hindi",
    "level": "A1",
    "modules": [
      {
        "id": "hi_a1_m1",
        "theme": "Greetings & Introductions",
        "lessons": [
          {
            "target_text": "नमस्ते",
            "english": "Hello / Namaste",
            "phonetic_transcription": "Namaste"
          },
          {
            "target_text": "आप कैसे हैं?",
            "english": "How are you? (Masculine/Formal)",
            "phonetic_transcription": "Aap kaise hain?"
          },
          {
            "target_text": "मेरा नाम ... है।",
            "english": "My name is ...",
            "phonetic_transcription": "Mera naam ... hai"
          }
        ],
        "liar_game_data": {
          "trap": "Using 'Tum kaise hai?'",
          "correct_version": "Tum kaise ho?",
          "explanation": "The auxiliary verb 'hai' is for singular/formal 'Aap', while 'Tum' requires 'ho'."
        }
      },
      {
        "id": "hi_a1_m2",
        "theme": "Numbers & Time",
        "lessons": [
          {
            "target_text": "एक, दो, तीन, चार, पाँच",
            "english": "1, 2, 3, 4, 5",
            "phonetic_transcription": "Ek, Do, Teen, Chaar, Paanch"
          },
          {
            "target_text": "कितने बजे हैं?",
            "english": "What time is it?",
            "phonetic_transcription": "Kitne baje hain?"
          }
        ],
        "liar_game_data": {
          "trap": "Ek baje hain (1 o'clock plural)",
          "correct_version": "Ek bajaa hai",
          "explanation": "'Ek' is singular, so it uses 'bajaa hai' instead of the plural 'baje hain'."
        }
      },
      {
        "id": "hi_a1_m3",
        "theme": "Family & Relationships",
        "lessons": [
          {
            "target_text": "माता और पिता",
            "english": "Mother and Father",
            "phonetic_transcription": "Mata aur Pita"
          },
          {
            "target_text": "भाई और बहन",
            "english": "Brother and Sister",
            "phonetic_transcription": "Bhai aur Bahen"
          }
        ],
        "liar_game_data": {
          "trap": "Calling an elder brother by name only.",
          "correct_version": "Name + Bhaiya",
          "explanation": "In Indian culture, adding 'Bhaiya' (brother) or 'Didi' (sister) after the name is standard for elders to show respect."
        }
      },
      {
        "id": "hi_a1_m4",
        "theme": "Food & Dining",
        "lessons": [
          {
            "target_text": "मुझे भूख लगी है।",
            "english": "I am hungry.",
            "phonetic_transcription": "Mujhe bhookh lagi hai"
          },
          {
            "target_text": "पानी पीजिए।",
            "english": "Please drink water.",
            "phonetic_transcription": "Paani peejiye"
          }
        ],
        "liar_game_data": {
          "trap": "Mujhe khana khana hai (I want to eat food) - using 'hai' incorrectly with female speakers.",
          "correct_version": "Agreement stays same as 'Khana' is masculine.",
          "explanation": "Even if the speaker is female, 'khana' is the object, so it doesn't change based on the speaker's gender here."
        }
      },
      {
        "id": "hi_a1_m5",
        "theme": "Daily Routine",
        "lessons": [
          {
            "target_text": "मैं सोता हूँ।",
            "english": "I sleep. (Masculine)",
            "phonetic_transcription": "Main sota hoon"
          },
          {
            "target_text": "मैं सोती हूँ।",
            "english": "I sleep. (Feminine)",
            "phonetic_transcription": "Main soti hoon"
          }
        ],
        "liar_game_data": {
          "trap": "Main kaam karta hai.",
          "correct_version": "Main kaam karta hoon.",
          "explanation": "The pronoun 'Main' (I) always pairs with the auxiliary 'hoon'."
        }
      }
    ]
  },
  {
    "language": "French",
    "level": "A1",
    "modules": [
      {
        "id": "fr_a1_m1",
        "theme": "Greetings & Introductions",
        "lessons": [
          {
            "target_text": "Bonjour",
            "english": "Hello / Good morning",
            "phonetic_transcription": "Bon-zhoor"
          },
          {
            "target_text": "Comment ça va ?",
            "english": "How is it going?",
            "phonetic_transcription": "Ko-mon sa va"
          },
          {
            "target_text": "Enchanté",
            "english": "Delighted (Nice to meet you)",
            "phonetic_transcription": "On-shon-tay"
          }
        ],
        "liar_game_data": {
          "trap": "Salute (Ending with 'e')",
          "correct_version": "Salut",
          "explanation": "English speakers often add a silent 'e' like in 'Salute', but the French greeting is 'Salut' with a silent 't'."
        }
      },
      {
        "id": "fr_a1_m2",
        "theme": "Numbers & Time",
        "lessons": [
          {
            "target_text": "Un, deux, trois, quatre, cinq",
            "english": "1, 2, 3, 4, 5",
            "phonetic_transcription": "Uh, deuh, trwa, katr, sank"
          },
          {
            "target_text": "Il est quelle heure ?",
            "english": "What time is it?",
            "phonetic_transcription": "Eel ay kel eur"
          }
        ],
        "liar_game_data": {
          "trap": "Il est huit heures (Pronouncing 't' in huit as silent)",
          "correct_version": "Pronounced 'weet eur' with liaison.",
          "explanation": "Usually 'huit' has a pronounced 't', and it creates a liaison with 'heures'."
        }
      },
      {
        "id": "fr_a1_m3",
        "theme": "Family & Relationships",
        "lessons": [
          {
            "target_text": "Le père et la mère",
            "english": "The father and the mother",
            "phonetic_transcription": "Le pair ay la mair"
          },
          {
            "target_text": "Mon frère et ma sœur",
            "english": "My brother and my sister",
            "phonetic_transcription": "Mon frair ay ma seur"
          }
        ],
        "liar_game_data": {
          "trap": "Mon amie (My female friend) spelled 'Ma amie'",
          "correct_version": "Mon amie",
          "explanation": "Even for feminine nouns, if they start with a vowel, you use 'Mon' instead of 'Ma' to avoid the vowel clash."
        }
      },
      {
        "id": "fr_a1_m4",
        "theme": "Food & Dining",
        "lessons": [
          {
            "target_text": "Le pain et le fromage",
            "english": "Bread and cheese",
            "phonetic_transcription": "Le pan ay le fro-mazh"
          },
          {
            "target_text": "L'addition, s'il vous plaît",
            "english": "The bill, please",
            "phonetic_transcription": "La-dee-syon seel voo play"
          }
        ],
        "liar_game_data": {
          "trap": "Je suis faim (I am hunger)",
          "correct_version": "J'ai faim (I have hunger)",
          "explanation": "In French, physiological states like hunger, thirst, or age use the verb 'avoir' (to have), not 'être' (to be)."
        }
      },
      {
        "id": "fr_a1_m5",
        "theme": "Daily Routine",
        "lessons": [
          {
            "target_text": "Je me réveille à 7h",
            "english": "I wake up at 7am",
            "phonetic_transcription": "Zhe me ray-vay à set eur"
          },
          {
            "target_text": "Je me douche",
            "english": "I shower",
            "phonetic_transcription": "Zhe me doosh"
          }
        ],
        "liar_game_data": {
          "trap": "Je réveille (I wake up someone else vs myself)",
          "correct_version": "Je me réveille",
          "explanation": "Reflexive verbs like 'se réveiller' must include the pronoun 'me/te/se' when the action is done to oneself."
        }
      }
    ]
  }
];
