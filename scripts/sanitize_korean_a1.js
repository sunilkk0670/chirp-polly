const fs = require('fs');
const path = require('path');

const dataDir = 'C:/Users/Sindhu/Desktop/chirp-polly/firestore_data';
const files = ['ko_a1_m01.json', 'ko_a1_m02.json', 'ko_a1_m03.json', 'ko_a1_m04.json', 'ko_a1_m05.json', 'ko_a1_m06.json', 'ko_a1_m07.json', 'ko_a1_m08.json', 'ko_a1_m09.json', 'ko_a1_m10.json'];

const globalSeen = new Set();

function sanitizeFile(filename, replacements) {
    const filePath = path.join(dataDir, filename);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const uniqueWords = [];
    const localSeen = new Set();

    data.lessons[0].words.forEach(w => {
        if (!globalSeen.has(w.word) && !localSeen.has(w.word)) {
            uniqueWords.push(w);
            localSeen.add(w.word);
            globalSeen.add(w.word);
        }
    });

    while (uniqueWords.length < 100 && replacements.length > 0) {
        const next = replacements.shift();
        if (!globalSeen.has(next.word) && !localSeen.has(next.word)) {
            uniqueWords.push(next);
            localSeen.add(next.word);
            globalSeen.add(next.word);
        }
    }

    data.lessons[0].words = uniqueWords;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`${filename}: Final count: ${uniqueWords.length}`);
}

// 1. Load M1 (Master)
const m1 = JSON.parse(fs.readFileSync(path.join(dataDir, 'ko_a1_m01.json'), 'utf8'));
m1.lessons[0].words.forEach(w => globalSeen.add(w.word));

// 2. Sanitize M2
sanitizeFile('ko_a1_m02.json', [
    { "word": "조부모님", "reading": "Jobumonim", "meaning": "Grandparents", "example_sentence": "주말에 조부모님을 뵈러 갔어요. (I went to see my grandparents on the weekend.)" },
    { "word": "손자녀", "reading": "Sonjannyeo", "meaning": "Grandchildren", "example_sentence": "할머니는 손자녀들을 매우 아끼세요. (Grandmother cares for her grandchildren very much.)" },
    { "word": "시아버지", "reading": "Siabeoji", "meaning": "Father-in-law (Husband's side)", "example_sentence": "시아버지께 선물을 드렸어요. (I gave a gift to my father-in-law.)" },
    { "word": "시어머니", "reading": "Sieomeoni", "meaning": "Mother-in-law (Husband's side)", "example_sentence": "시어머니와 함께 요리를 했어요. (I cooked together with my mother-in-law.)" },
    { "word": "사위", "reading": "Sawi", "meaning": "Son-in-law", "example_sentence": "우리 장모님은 사위 사랑이 대단하세요. (My mother-in-law's love for her son-in-law is great.)" },
    { "word": "며느리", "reading": "Myeoneuri", "meaning": "Daughter-in-law", "example_sentence": "새로 들어온 며느리가 참 참해요. (The new daughter-in-law is very graceful.)" },
    { "word": "장인", "reading": "Jangin", "meaning": "Father-in-law (Wife's side)", "example_sentence": "장인어른과 바둑을 두었어요. (I played Go with my father-in-law.)" },
    { "word": "장모", "reading": "Jangmo", "meaning": "Mother-in-law (Wife's side)", "example_sentence": "장모님이 차려주신 밥상이 최고예요. (The meal prepared by my mother-in-law is the best.)" },
    { "word": "고모부", "reading": "Gomobu", "meaning": "Uncle (Paternal aunt's husband)", "example_sentence": "고모부께서 용돈을 주셨어요. (My uncle gave me some allowance.)" },
    { "word": "이모부", "reading": "Imobu", "meaning": "Uncle (Maternal aunt's husband)", "example_sentence": "이모부와 캠핑을 갔어요. (I went camping with my maternal uncle.)" },
    { "word": "외삼촌", "reading": "Oesamchon", "meaning": "Uncle (Maternal side)", "example_sentence": "외삼촌은 무역 회사에 다니세요. (My maternal uncle works at a trading company.)" },
    { "word": "외숙모", "reading": "Oesukmo", "meaning": "Aunt (Maternal uncle's wife)", "example_sentence": "외숙모가 사과를 깎아 주셨어요. (My maternal aunt peeled an apple for me.)" },
    { "word": "오촌", "reading": "Ochon", "meaning": "Fifth degree relative", "example_sentence": "오촌 당숙을 뵈러 갔어요. (I went to see my cousin once removed.)" },
    { "word": "아가씨", "reading": "Agassi", "meaning": "Young lady / Husband's younger sister", "example_sentence": "우리 아가씨는 마음씨가 고와요. (Our young lady has a kind heart.)" },
    { "word": "도련님", "reading": "Doryeonnim", "meaning": "Young gentleman / Husband's younger brother", "example_sentence": "도련님, 공부 열심히 하세요. (Young master, study hard.)" },
    { "word": "연인", "reading": "Yeonin", "meaning": "Lovers / Couple", "example_sentence": "다정한 연인이 공원을 걸어요. (A sweet couple walks in the park.)" },
    { "word": "중매", "reading": "Jungmae", "meaning": "Matchmaking", "example_sentence": "중매로 좋은 사람을 만났어요. (I met a good person through matchmaking.)" },
    { "word": "약혼", "reading": "Yakhon", "meaning": "Engagement", "example_sentence": "지난달에 약혼식을 올렸어요. (We had an engagement ceremony last month.)" },
    { "word": "신랑", "reading": "Sillang", "meaning": "Groom", "example_sentence": "신랑이 무대 위로 입장해요. (The groom enters onto the stage.)" },
    { "word": "신부", "reading": "Sinbu", "meaning": "Bride", "example_sentence": "신부의 드레스가 정말 예뻐요. (The bride's dress is really pretty.)" },
    { "word": "축의금", "reading": "Chuguigeum", "meaning": "Wedding gift money", "example_sentence": "축의금을 준비했어요. (I prepared the wedding gift money.)" }
]);

// 3. Sanitize M3
sanitizeFile('ko_a1_m03.json', [
    { "word": "맛깔나다", "reading": "Matkkalnada", "meaning": "Tasty / Savory", "example_sentence": "음식이 참 맛깔나요. (The food is very savory.)" },
    { "word": "담백하다", "reading": "Dambaekhada", "meaning": "Light / Clean taste", "example_sentence": "이 국은 맛이 담백해요. (This soup has a light taste.)" },
    { "word": "고소하다", "reading": "Gosohada", "meaning": "Nutty / Savory", "example_sentence": "참기름이 아주 고소해요. (The sesame oil is very nutty.)" },
    { "word": "얼큰하다", "reading": "Eolkeunhada", "meaning": "Spicy and refreshing", "example_sentence": "국물이 얼큰해서 좋아요. (I like the soup because it's spicy and refreshing.)" },
    { "word": "느끼하다", "reading": "Neukkihada", "meaning": "Greasy / Oily", "example_sentence": "튀김이 좀 느끼하네요. (The fried food is a bit greasy.)" }
]);

// 4. Sanitize M4
sanitizeFile('ko_a1_m04.json', [
    { "word": "거스름돈", "reading": "Geoseureumdon", "meaning": "Change (money)", "example_sentence": "거스름돈 받으세요. (Please take your change.)" },
    { "word": "일시불", "reading": "Ilsibul", "meaning": "One-time payment", "example_sentence": "일시불로 할게요. (I'll pay it in one lump sum.)" }
]);

// 5. Sanitize M5
sanitizeFile('ko_a1_m05.json', [
    { "word": "퇴근하다", "reading": "Toegeunhada", "meaning": "To leave work", "example_sentence": "여섯 시에 퇴근해요. (I leave work at six.)" },
    { "word": "출근하다", "reading": "Chulgeunhada", "meaning": "To go to work", "example_sentence": "아침 일찍 출근해요. (I go to work early in the morning.)" },
    { "word": "등교하다", "reading": "Deunggyohada", "meaning": "To go to school", "example_sentence": "버스를 타고 등교해요. (I go to school by bus.)" },
    { "word": "하교하다", "reading": "Hagyohada", "meaning": "To leave school", "example_sentence": "오후 네 시에 하교해요. (I leave school at 4 PM.)" },
    { "word": "낮잠자다", "reading": "Natjamjada", "meaning": "To take a nap", "example_sentence": "주말에는 낮잠을 자요. (I take a nap on weekends.)" },
    { "word": "양치하다", "reading": "Yangchihada", "meaning": "To brush teeth", "example_sentence": "식사 후에 양치를 해요. (I brush my teeth after meals.)" },
    { "word": "화장하다", "reading": "Hwajanghada", "meaning": "To do makeup", "example_sentence": "거울을 보고 화장해요. (I look in the mirror and do my makeup.)" },
    { "word": "면도하다", "reading": "Myeondohada", "meaning": "To shave", "example_sentence": "매일 아침 면도해요. (I shave every morning.)" },
    { "word": "외출하다", "reading": "Oechulhada", "meaning": "To go out", "example_sentence": "친구를 만나러 외출해요. (I'm going out to meet a friend.)" },
    { "word": "기지개", "reading": "Gijigae", "meaning": "Stretching (after waking)", "example_sentence": "일어나서 기지개를 켜요. (After waking up, I stretch.)" },
    { "word": "하품", "reading": "Hapum", "meaning": "Yawn", "example_sentence": "입을 크게 벌리고 하품을 해요. (I open my mouth wide and yawn.)" },
    { "word": "지각", "reading": "Jigak", "meaning": "Being late / Lateness", "example_sentence": "학교에 지각하지 마세요. (Don't be late for school.)" },
    { "word": "정시", "reading": "Jeongsi", "meaning": "Exactly on time", "example_sentence": "버스가 정시에 왔어요. (The bus arrived exactly on time.)" },
    { "word": "한밤중", "reading": "Hanbamjung", "meaning": "Middle of the night", "example_sentence": "한밤중에 갑자기 깼어요. (I suddenly woke up in the middle of the night.)" },
    { "word": "평소", "reading": "Pyeongso", "meaning": "Ordinary times / Usually", "example_sentence": "평소보다 일찍 일어났어요. (I woke up earlier than usual.)" },
    { "word": "미루다", "reading": "Miruda", "meaning": "To postpone / delay", "example_sentence": "숙제를 나중으로 미루지 마세요. (Don't postpone your homework until later.)" },
    { "word": "서두르다", "reading": "Seodeureuda", "meaning": "To hurry", "example_sentence": "지각할 것 같아서 서둘렀어요. (I hurried because it seemed like I would be late.)" }
]);

// Sanitize M6
sanitizeFile('ko_a1_m06.json', [
    { "word": "오르막길", "reading": "Oreumakgil", "meaning": "Uphill road", "example_sentence": "오르막길이라 걷기 힘들어요. (It's hard to walk because it's an uphill road.)" },
    { "word": "내리막길", "reading": "Naerimakgil", "meaning": "Downhill road", "example_sentence": "내리막길에서는 자전거 속도가 빨라요. (Bicycle speed is fast on downhill roads.)" },
    { "word": "일방통행", "reading": "Ilbangtonghaeng", "meaning": "One-way street", "example_sentence": "이 길은 일방통행로예요. (This road is a one-way street.)" },
    { "word": "지하상가", "reading": "Jihasangga", "meaning": "Underground shopping center", "example_sentence": "강남역 지하상가에 옷이 많아요. (There are many clothes in the Gangnam station underground shopping center.)" }
]);

// Sanitize M7
sanitizeFile('ko_a1_m07.json', [
    { "word": "연기", "reading": "Yeon-gi", "meaning": "Acting", "example_sentence": "연기 학원에 다니고 있어요. (I'm attending an acting academy.)" },
    { "word": "연극", "reading": "Yeongeuk", "meaning": "Play / Drama", "example_sentence": "주말에 소극장에서 연극을 봤어요. (I watched a play at a small theater on the weekend.)" },
    { "word": "도자기", "reading": "Dojagi", "meaning": "Ceramics / Pottery", "example_sentence": "직접 도자기를 빚어 봤어요. (I tried making pottery myself.)" },
    { "word": "서핑보드", "reading": "Seoping-bodeu", "meaning": "Surfboard", "example_sentence": "새 서핑보드를 샀어요. (I bought a new surfboard.)" }
]);

// Sanitize M8
sanitizeFile('ko_a1_m08.json', [
    { "word": "태양", "reading": "Taeyang", "meaning": "Sun (Astronomical)", "example_sentence": "태양은 지구보다 훨씬 거대해요. (The sun is much larger than the earth.)" },
    { "word": "강풍", "reading": "Gangpung", "meaning": "Strong wind / Gale", "example_sentence": "강풍이 불어서 간판이 떨어졌어요. (The sign dropped because of the strong wind.)" }
]);

// Sanitize M9
sanitizeFile('ko_a1_m09.json', [
    { "word": "쌍꺼풀", "reading": "Ssangkkeopul", "meaning": "Double eyelid", "example_sentence": "쌍꺼풀 수술이 아주 자연스러워요. (The double eyelid surgery is very natural.)" },
    { "word": "주름", "reading": "Jureum", "meaning": "Wrinkle", "example_sentence": "눈가에 주름이 생겼어요. (Wrinkles formed around the eyes.)" },
    { "word": "대사", "reading": "Daesa", "meaning": "Metabolism", "example_sentence": "기초 대사량이 높아야 살이 안 쪄요. (Basal metabolism must be high for not gaining weight.)" },
    { "word": "체격", "reading": "Chegyeok", "meaning": "Physique / Build", "example_sentence": "운동을 해서 체격이 좋아졌어요. (The physique improved from exercising.)" },
    { "word": "진료", "reading": "Jinnyo", "meaning": "Medical treatment / Consultation", "example_sentence": "진료 대기 시간이 길어요. (The waiting time for treatment is long.)" },
    { "word": "건강식", "reading": "Geongangsik", "meaning": "Health food", "example_sentence": "건강식을 챙겨 먹는 습관이 중요해요. (The habit of eating health food is important.)" },
    { "word": "보약", "reading": "Boyak", "meaning": "Restorative medicine / Tonic", "example_sentence": "부모님께 보약을 한 재 지어 드렸어요. (I had a tonic made for my parents.)" },
    { "word": "알레르기", "reading": "Allereugi", "meaning": "Allergy", "example_sentence": "저는 땅콩 알레르기가 있어요. (I have a peanut allergy.)" },
    { "word": "스트레스", "reading": "Seuteureseu", "meaning": "Stress", "example_sentence": "스트레스는 만병의 근원이에요. (Stress is the root of all diseases.)" },
    { "word": "다이어트", "reading": "Da-ieoteu", "meaning": "Diet", "example_sentence": "내일부터 다이어트를 시작할 거예요. (I will start a diet from tomorrow.)" }
]);

// Sanitize M10
sanitizeFile('ko_a1_m10.json', [
    { "word": "성취", "reading": "Seongchwi", "meaning": "Achievement / Fulfillment", "example_sentence": "작은 성취가 모여 큰 성공을 이뤄요. (Small achievements gather to form big success.)" },
    { "word": "희망", "reading": "Huimang", "meaning": "Hope / Wish", "example_sentence": "새해에는 희망찬 일만 가득하세요. (May the new year be full of hopeful things.)" },
    { "word": "인연", "reading": "Inyeon", "meaning": "Relationship / Connection (Fate)", "example_sentence": "우리의 인연을 소중히 생각해요. (I value our connection.)" },
    { "word": "행운", "reading": "Haeng-un", "meaning": "Good luck", "example_sentence": "당신에게 행운이 깃들길 바라요. (I wish good luck stays with you.)" },
    { "word": "구청", "reading": "Gucheong", "meaning": "District office", "example_sentence": "구청에 가서 서류를 뗐어요. (I went to the district office and got the documents.)" },
    { "word": "시청", "reading": "Sicheong", "meaning": "City hall", "example_sentence": "시청 광장에서 축제가 열려요. (A festival is held at City Hall Plaza.)" },
    { "word": "도청", "reading": "Docheong", "meaning": "Provincial office", "example_sentence": "도청 건물이 아주 웅장해요. (The provincial office building is very grand.)" },
    { "word": "대사관", "reading": "Daesagwan", "meaning": "Embassy", "example_sentence": "비자를 받으러 대사관에 가요. (I'm going to the embassy to get a visa.)" },
    { "word": "영사관", "reading": "Yeongsagwan", "meaning": "Consulate", "example_sentence": "영사관에서 여권을 갱신했어요. (I renewed my passport at the consulate.)" },
    { "word": "출입국", "reading": "Churipguk", "meaning": "Immigration / Entry and exit", "example_sentence": "출입국 관리소에 방문해야 해요. (I need to visit the immigration office.)" },
    { "word": "외국인", "reading": "Oegugin", "meaning": "Foreigner", "example_sentence": "한국에는 외국인 관광객이 많아요. (There are many foreign tourists in Korea.)" },
    { "word": "신청서", "reading": "Sincheongseo", "meaning": "Application form", "example_sentence": "여기에 신청서를 작성해 주세요. (Please fill out the application form here.)" },
    { "word": "증명서", "reading": "Jeungmyeongseo", "meaning": "Certificate", "example_sentence": "재학 증명서가 필요해요. (I need a certificate of enrollment.)" },
    { "word": "서류", "reading": "Seoryu", "meaning": "Document / Paperwork", "example_sentence": "서류 준비를 다 끝냈나요? (Have you finished the paperwork?) " },
    { "word": "도장", "reading": "Dojang", "meaning": "Stamp / Seal", "example_sentence": "여기에 도장을 찍어 주세요. (Please stamp here.)" },
    { "word": "사인", "reading": "Sain", "meaning": "Signature / Autograph", "example_sentence": "계약서에 사인을 했어요. (I signed the contract.)" },
    { "word": "결과", "reading": "Gyeol-gwa", "meaning": "Result", "example_sentence": "노력한 만큼 좋은 결과가 있을 거예요. (There will be good results as much as you worked hard.)" },
    { "word": "정보", "reading": "Jeongbo", "meaning": "Information", "example_sentence": "유용한 정보를 많이 얻었어요. (I got a lot of useful information.)" },
    { "word": "경험", "reading": "Gyeong-heom", "meaning": "Experience", "example_sentence": "새로운 경험은 언제나 즐거워요. (A new experience is always enjoyable.)" },
    { "word": "노력", "reading": "Noryeok", "meaning": "Effort", "example_sentence": "성공을 위해 꾸준히 노력하세요. (Strive consistently for success.)" }
]);
