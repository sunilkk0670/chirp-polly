const fs = require('fs');

const filePath = 'C:/Users/Sindhu/Desktop/chirp-polly/firestore_data/ko_a2_m06.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const words = data.lessons[0].vocabularyItems;

const replacements = {
    '대형마트': { word: '창고형매장', reading: 'Changgohyeongmaejang', meaning: 'Warehouse store', example_sentence: '창고형매장에서 대용량으로 샀어요. (I bought in bulk at the warehouse store.)' },
    '편의점': { word: '가맹점', reading: 'Gamaengjeom', meaning: 'Franchise store / Member store', example_sentence: '이 카드는 가맹점에서만 사용 가능해요. (This card can only be used at member stores.)' },
    '사다': { word: '구매하다', reading: 'Gumaehada', meaning: 'To purchase (formal)', example_sentence: '온라인으로 티켓을 구매했어요. (I purchased the tickets online.)' },
    '팔다': { word: '판매하다', reading: 'Panmaehada', meaning: 'To sell (formal)', example_sentence: '신제품을 판매하기 시작했습니다. (They started selling new products.)' },
    '환불': { word: '결제취소', reading: 'Gyeoljechwiso', meaning: 'Payment cancellation', example_sentence: '단순 변심으로 인한 결제취소예요. (It\'s a payment cancellation due to a simple change of mind.)' },
    '영수증': { word: '매출전표', reading: 'Maechuljeonpyo', meaning: 'Sales slip / Transaction report', example_sentence: '매출전표를 확인해 보세요. (Please check the sales slip.)' },
    '깎다': { word: '에누리', reading: 'Enuri', meaning: 'Haggling / Discounting', example_sentence: '시장의 묘미는 에누리예요. (The charm of the market is haggling.)' },
    '봉투': { word: '비닐봉지', reading: 'Binilbongji', meaning: 'Plastic bag', example_sentence: '비닐봉지 사용을 줄여야 해요. (We should reduce the use of plastic bags.)' },
    '장바구니': { word: '에코백', reading: 'Ekobaek', meaning: 'Eco-bag / Reusable bag', example_sentence: '에코백을 들고 쇼핑해요. (I shop carrying an eco-bag.)' },
    '현금': { word: '화폐', reading: 'Hwapye', meaning: 'Currency / Money', example_sentence: '위조 화폐를 조심하세요. (Be careful of counterfeit currency.)' },
    '일시불': { word: '완불', reading: 'Wanbul', meaning: 'Full payment / Payment in full', example_sentence: '잔금을 오늘 완불했습니다. (I paid the balance in full today.)' },
    '적립': { word: '마일리지', reading: 'Mailliji', meaning: 'Mileage / Reward points', example_sentence: '항공사 마일리지를 쌓았어요. (I accumulated airline mileage.)' },
    '백화점': { word: '복합쇼핑몰', reading: 'Bokhap syopingmol', meaning: 'Complex shopping mall', example_sentence: '복합쇼핑몰에 모든 가게가 다 있어요. (The complex mall has every store.)' },
    '할인': { word: '특가', reading: 'Teukga', meaning: 'Special price', example_sentence: '한정 수량 특가 판매 중이에요. (It\'s on sale at a special price for a limited quantity.)' },
    '덤': { word: '증정품', reading: 'Jeungjeongpum', meaning: 'Free gift / Promotional giveaway', example_sentence: '화장품을 사고 증정품을 받았어요. (I bought cosmetics and received a free gift.)' },
    '신발': { word: '수제화', reading: 'Sujehwa', meaning: 'Handmade shoes', example_sentence: '성수동에서 수제화를 맞췄어요. (I got handmade shoes in Seongsu-dong.)' },
    '운동화': { word: '러닝화', reading: 'Reoning-hwa', meaning: 'Running shoes', example_sentence: '가벼운 러닝화를 신고 뛰어요. (Run wearing lightweight running shoes.)' },
    '가방': { word: '배낭', reading: 'Baenang', meaning: 'Backpack', example_sentence: '여행용 배낭을 샀어요. (I bought a travel backpack.)' },
    '모자': { word: '비니', reading: 'Bini', meaning: 'Beanie / Knit cap', example_sentence: '겨울이라서 따뜻한 비니를 썼어요. (I wore a warm beanie since it\'s winter.)' },
    '안경': { word: '돋보기', reading: 'Dotbogi', meaning: 'Reading glasses / Magnifier', example_sentence: '할머니께 돋보기를 선물해 드렸어요. (I gave my grandmother reading glasses as a gift.)' },
    '선글라스': { word: '고글', reading: 'Gogeul', meaning: 'Goggles', example_sentence: '스키 탈 때 고글을 써야 해요. (You should wear goggles when skiing.)' },
    '시계': { word: '손목시계', reading: 'Sonmoksigye', meaning: 'Wristwatch', example_sentence: '손목시계 배터리를 갈았어요. (I changed the wristwatch battery.)' },
    '화장품': { word: '기초화장품', reading: 'Gichohwajangpum', meaning: 'Skincare cosmetics / Basic cosmetics', example_sentence: '피부에 맞는 기초화장품을 써요. (I use skincare cosmetics that suit my skin.)' },
    '치약': { word: '가글', reading: 'Gageul', meaning: 'Mouthwash / Gargle', example_sentence: '양치 후에 가글을 했어요. (I used mouthwash after brushing.)' },
    '칫솔': { word: '전동칫솔', reading: 'Jeondongchitsol', meaning: 'Electric toothbrush', example_sentence: '전동칫솔이 더 깨끗하게 닦여요. (Electric toothbrushes clean more effectively.)' },
    '비누': { word: '바디클렌저', reading: 'Badikeullenjeo', meaning: 'Body cleanser / Body wash', example_sentence: '향이 좋은 바디클렌저를 샀어요. (I bought a good-smelling body wash.)' },
    '수건': { word: '타월', reading: 'Tawol', meaning: 'Towel (loanword)', example_sentence: '샤워 후 비치 타월을 썼어요. (I used a beach towel after showering.)' },
    '전자제품': { word: '디지털기기', reading: 'Dijiteolgigi', meaning: 'Digital devices', example_sentence: '다양한 디지털기기를 활용해요. (I use various digital devices.)' },
    '휴대폰': { word: '스마트폰', reading: 'Seumateupon', meaning: 'Smartphone', example_sentence: '스마트폰으로 영화를 봐요. (I watch movies on my smartphone.)' },
    '카메라': { word: '캠코더', reading: 'Kaemkodeo', meaning: 'Camcorder / Video camera', example_sentence: '캠코더로 아이의 영상을 찍었어요. (I filmed the child with a camcorder.)' },
    '공책': { word: '연습장', reading: 'Yeonseupjang', meaning: 'Exercise book / Scratchpad', example_sentence: '연습장에 수학 문제를 풀었어요. (I solved math problems on the scratchpad.)' },
    '볼펜': { word: '사인펜', reading: 'Sainpen', meaning: 'Sign pen / Felt-tip pen / Marker', example_sentence: '중요한 내용은 사인펜으로 써요. (Write important content with a sign pen.)' }
};

let replacedCount = 0;
words.forEach((item, index) => {
    if (replacements[item.word]) {
        console.log(`Replacing word ${index + 1}: ${item.word} -> ${replacements[item.word].word}`);
        words[index] = replacements[item.word];
        replacedCount++;
    }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`\n✅ Replaced ${replacedCount} conflicting words in ko_a2_m06.json`);
