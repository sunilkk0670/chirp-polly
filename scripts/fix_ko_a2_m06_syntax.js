const fs = require('fs');
const filePath = 'C:/Users/Sindhu/Desktop/chirp-polly/firestore_data/ko_a2_m06.json';
let content = fs.readFileSync(filePath, 'utf8');

// Replace all \' with '
content = content.replace(/\\'/g, "'");

fs.writeFileSync(filePath, content);
console.log('✅ Fixed syntax errors in ko_a2_m06.json');
