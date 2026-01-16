import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../firestore_data');

const blacklist = new Set(JSON.parse(fs.readFileSync(path.join(dataDir, 'korean_a1_a2_blacklist.json'), 'utf8')));

function generateSafeWords(count, theme, existingB1) {
    // This is a placeholder logic for the thought process.
    // In reality, I will provide the words here.
}

const m02Words = [
    "임용", "직무", "보수", "수당", "사업장", "상급자", "하급자", "조직", "경리", "판촉",
    "수주", "매출", "약정", "상신", "고과", "검수", "응대", "거래처", "통화", "연수",
    "개혁", "시정", "운영", "구축", "입안", "공조", "잔업", "휴무", "사직", "선발",
    "탈락", "신규", "이력", "문서", "지표", "비전", "근태", "정규직", "비정규직", "구인",
    "구직", "이직", "전직", "파견", "재직", "퇴직", "정년", "실업 급여", "노조", "단체 협약",
    "파업", "태업", "해고", "징계", "견책", "감봉", "정직", "대기 발령", "보직", "겸직",
    "부임", "이임", "취임", "퇴임", "전근", "파견근무", "유관 부서", "결재", "품의", "시행",
    "공문", "협조", "회람", "보존", "폐기", "열람", "대외비", "기밀", "보안", "유출",
    "감사", "모니터링", "성과급", "복리후생", "회식", "야유회", "창립 기념일", "근로 계약", "취업 규칙", "직장 내 괴롭힘",
    "성희롱", "남녀평등", "육아휴직", "출산휴가", "재택근무", "유연근무", "순환보직", "인사발령", "승급", "호봉"
];

const overlaps = m02Words.filter(w => blacklist.has(w));
console.log('Overlaps in proposed list:', overlaps);
