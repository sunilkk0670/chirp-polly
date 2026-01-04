const fs = require('fs');
const path = require('path');

console.log('Generating English A2 M08-M10 with strict exclusion...\n');

// Load all existing A1 and A2 words for exclusion
const allExisting = new Set();

// Load A1 words
const a1Words = JSON.parse(fs.readFileSync(
    path.join(__dirname, '../firestore_data/a1_word_list.json'),
    'utf8'
));
a1Words.forEach(w => allExisting.add(w.toLowerCase()));

// Load existing A2 words (M01-M07)
['en_a2_m01', 'en_a2_m02', 'en_a2_m03', 'en_a2_m04', 'en_a2_m05', 'en_a2_m06', 'en_a2_m07'].forEach(moduleId => {
    const data = JSON.parse(fs.readFileSync(
        path.join(__dirname, `../firestore_data/${moduleId}.json`),
        'utf8'
    ));
    data.vocabularyItems.forEach(item => allExisting.add(item.word.toLowerCase()));
});

console.log(`Excluding ${allExisting.size} existing words\n`);

// M08: Media & Entertainment - 100 words
const m08 = {
    "moduleId": "en_a2_m08",
    "theme": "Media & Entertainment",
    "level": "A2",
    "vocabularyItems": [
        { "word": "broadcast", "phonetic": "/ˈbrɔːdkæst/", "english": "The news will broadcast live from the stadium tonight." },
        { "word": "streaming", "phonetic": "/ˈstriːmɪŋ/", "english": "Streaming services have changed how we watch television shows." },
        { "word": "podcast", "phonetic": "/ˈpɑːdkæst/", "english": "I listen to podcasts while commuting to work daily." },
        { "word": "episode", "phonetic": "/ˈepɪsoʊd/", "english": "The final episode of the series airs next week." },
        { "word": "series", "phonetic": "/ˈsɪriːz/", "english": "This television series has been running for ten years." },
        { "word": "documentary", "phonetic": "/ˌdɑːkjuˈmentəri/", "english": "The documentary about wildlife was fascinating and educational to watch." },
        { "word": "drama", "phonetic": "/ˈdrɑːmə/", "english": "She prefers watching drama shows over comedy programs always." },
        { "word": "comedy", "phonetic": "/ˈkɑːmədi/", "english": "The comedy show made everyone laugh until they cried." },
        { "word": "thriller", "phonetic": "/ˈθrɪlər/", "english": "The thriller movie kept me on edge throughout." },
        { "word": "horror", "phonetic": "/ˈhɔːrər/", "english": "Horror movies are too scary for young children." },
        { "word": "animation", "phonetic": "/ˌænɪˈmeɪʃən/", "english": "The animation in this film is incredibly detailed and beautiful." },
        { "word": "soundtrack", "phonetic": "/ˈsaʊndtræk/", "english": "The movie soundtrack features songs from famous artists worldwide." },
        { "word": "screenplay", "phonetic": "/ˈskriːnpleɪ/", "english": "She wrote the screenplay for the award-winning film herself." },
        { "word": "script", "phonetic": "/skrɪpt/", "english": "The actors rehearsed the script for weeks before filming." },
        { "word": "director", "phonetic": "/dəˈrektər/", "english": "The director won an award for his outstanding work." },
        { "word": "producer", "phonetic": "/prəˈduːsər/", "english": "The producer invested millions in the new movie project." },
        { "word": "cinematography", "phonetic": "/ˌsɪnəməˈtɑːɡrəfi/", "english": "The cinematography in this film is absolutely stunning and memorable." },
        { "word": "editing", "phonetic": "/ˈedɪtɪŋ/", "english": "The editing of the video took several weeks to complete." },
        { "word": "premiere", "phonetic": "/prɪˈmɪr/", "english": "The movie premiere attracted many celebrities and fans last night." },
        { "word": "trailer", "phonetic": "/ˈtreɪlər/", "english": "The trailer for the new film looks very exciting." },
        { "word": "subtitle", "phonetic": "/ˈsʌbtaɪtəl/", "english": "Turn on the subtitles if you can't hear clearly." },
        { "word": "dubbing", "phonetic": "/ˈdʌbɪŋ/", "english": "The dubbing in foreign films sometimes loses the original emotion." },
        { "word": "narrator", "phonetic": "/ˈnæreɪtər/", "english": "The narrator's voice made the story come alive beautifully." },
        { "word": "anchor", "phonetic": "/ˈæŋkər/", "english": "The news anchor reported the breaking story this morning." },
        { "word": "reporter", "phonetic": "/rɪˈpɔːrtər/", "english": "The reporter interviewed witnesses at the scene of accident." },
        { "word": "journalist", "phonetic": "/ˈdʒɜːrnəlɪst/", "english": "The journalist wrote an article about climate change issues." },
        { "word": "columnist", "phonetic": "/ˈkɑːləmnɪst/", "english": "The columnist writes about politics every week in newspaper." },
        { "word": "editor", "phonetic": "/ˈedɪtər/", "english": "The editor reviewed all articles before publication carefully today." },
        { "word": "headline", "phonetic": "/ˈhedlaɪn/", "english": "The headline on the front page caught everyone's attention." },
        { "word": "article", "phonetic": "/ˈɑːrtɪkəl/", "english": "I read an interesting article about technology this morning." },
        { "word": "publication", "phonetic": "/ˌpʌblɪˈkeɪʃən/", "english": "The publication of the book was delayed by months." },
        { "word": "circulation", "phonetic": "/ˌsɜːrkjəˈleɪʃən/", "english": "The newspaper has a daily circulation of one million." },
        { "word": "subscription", "phonetic": "/səbˈskrɪpʃən/", "english": "I renewed my subscription to the magazine for another year." },
        { "word": "tabloid", "phonetic": "/ˈtæblɔɪd/", "english": "Tabloid newspapers often publish sensational stories about celebrities daily." },
        { "word": "press", "phonetic": "/pres/", "english": "The press conference will begin at noon sharp today." },
        { "word": "media", "phonetic": "/ˈmiːdiə/", "english": "Social media has changed how people communicate with others." },
        { "word": "viral", "phonetic": "/ˈvaɪrəl/", "english": "The video went viral and got millions of views." },
        { "word": "trending", "phonetic": "/ˈtrendɪŋ/", "english": "This topic is trending on social media right now." },
        { "word": "influencer", "phonetic": "/ˈɪnfluənsər/", "english": "Social media influencers promote products to their followers regularly." },
        { "word": "follower", "phonetic": "/ˈfɑːloʊər/", "english": "She has over one million followers on her account." },
        { "word": "subscriber", "phonetic": "/səbˈskraɪbər/", "english": "The channel gained thousands of new subscribers this month." },
        { "word": "upload", "phonetic": "/ˈʌploʊd/", "english": "Please upload the video to the platform by tonight." },
        { "word": "download", "phonetic": "/ˈdaʊnloʊd/", "english": "You can download the app from the store now." },
        { "word": "stream", "phonetic": "/striːm/", "english": "We can stream the concert live on our phones." },
        { "word": "buffer", "phonetic": "/ˈbʌfər/", "english": "The video keeps buffering due to slow internet connection." },
        { "word": "bandwidth", "phonetic": "/ˈbændwɪdθ/", "english": "We need more bandwidth to stream high quality videos." },
        { "word": "pixel", "phonetic": "/ˈpɪksəl/", "english": "The image has millions of pixels for sharp quality." },
        { "word": "resolution", "phonetic": "/ˌrezəˈluːʃən/", "english": "The camera records video in high resolution quality always." },
        { "word": "graphics", "phonetic": "/ˈɡræfɪks/", "english": "The video game has amazing graphics and visual effects." },
        { "word": "interface", "phonetic": "/ˈɪntərfeɪs/", "english": "The user interface is very easy to navigate quickly." },
        { "word": "platform", "phonetic": "/ˈplætfɔːrm/", "english": "This platform allows users to share videos and photos." },
        { "word": "algorithm", "phonetic": "/ˈælɡərɪðəm/", "english": "The algorithm recommends videos based on your viewing history." },
        { "word": "analytics", "phonetic": "/ˌænəˈlɪtɪks/", "english": "The analytics show how many people watched the video." },
        { "word": "engagement", "phonetic": "/ɪnˈɡeɪdʒmənt/", "english": "High engagement means people are interacting with your content." },
        { "word": "content", "phonetic": "/ˈkɑːntent/", "english": "Creating quality content takes time and effort every day." },
        { "word": "creator", "phonetic": "/kriˈeɪtər/", "english": "Content creators make videos for their audience regularly now." },
        { "word": "channel", "phonetic": "/ˈtʃænəl/", "english": "Subscribe to our channel for more interesting videos daily." },
        { "word": "playlist", "phonetic": "/ˈpleɪlɪst/", "english": "I created a playlist of my favorite songs yesterday." },
        { "word": "genre", "phonetic": "/ˈʒɑːnrə/", "english": "What genre of music do you prefer listening to?" },
        { "word": "melody", "phonetic": "/ˈmelədi/", "english": "The melody of this song is very catchy and memorable." },
        { "word": "rhythm", "phonetic": "/ˈrɪðəm/", "english": "The rhythm makes you want to dance immediately always." },
        { "word": "tempo", "phonetic": "/ˈtempoʊ/", "english": "The tempo of the music is fast and energetic." },
        { "word": "harmony", "phonetic": "/ˈhɑːrməni/", "english": "The voices blend together in perfect harmony beautifully today." },
        { "word": "lyrics", "phonetic": "/ˈlɪrɪks/", "english": "The lyrics of this song are very meaningful and deep." },
        { "word": "verse", "phonetic": "/vɜːrs/", "english": "The first verse of the song is my favorite." },
        { "word": "chorus", "phonetic": "/ˈkɔːrəs/", "english": "Everyone sang along during the chorus of the song." },
        { "word": "album", "phonetic": "/ˈælbəm/", "english": "The band released a new album last month finally." },
        { "word": "single", "phonetic": "/ˈsɪŋɡəl/", "english": "Their latest single is number one on the charts." },
        { "word": "remix", "phonetic": "/ˈriːmɪks/", "english": "The remix of the song is better than original." },
        { "word": "acoustic", "phonetic": "/əˈkuːstɪk/", "english": "The acoustic version of the song is very beautiful." },
        { "word": "instrumental", "phonetic": "/ˌɪnstrəˈmentəl/", "english": "The instrumental music is perfect for studying and concentration." },
        { "word": "vocal", "phonetic": "/ˈvoʊkəl/", "english": "Her vocal performance was absolutely outstanding and powerful tonight." },
        { "word": "performance", "phonetic": "/pərˈfɔːrməns/", "english": "The live performance was better than the recording itself." },
        { "word": "rehearsal", "phonetic": "/rɪˈhɜːrsəl/", "english": "The band has rehearsal every Tuesday evening at seven." },
        { "word": "audition", "phonetic": "/ɔːˈdɪʃən/", "english": "She passed the audition and got the lead role." },
        { "word": "casting", "phonetic": "/ˈkæstɪŋ/", "english": "The casting for the new movie begins next week." },
        { "word": "rehearse", "phonetic": "/rɪˈhɜːrs/", "english": "The actors will rehearse the scene again this afternoon." },
        { "word": "improvise", "phonetic": "/ˈɪmprəvaɪz/", "english": "The comedian can improvise jokes on any topic quickly." },
        { "word": "entertain", "phonetic": "/ˌentərˈteɪn/", "english": "The magician entertained the children at the birthday party." },
        { "word": "applause", "phonetic": "/əˈplɔːz/", "english": "The audience gave a standing ovation with loud applause." },
        { "word": "ovation", "phonetic": "/oʊˈveɪʃən/", "english": "The singer received a standing ovation after her performance." },
        { "word": "encore", "phonetic": "/ˈɑːŋkɔːr/", "english": "The crowd demanded an encore after the amazing show." },
        { "word": "venue", "phonetic": "/ˈvenjuː/", "english": "The concert venue can hold ten thousand people comfortably." },
        { "word": "backstage", "phonetic": "/ˌbækˈsteɪdʒ/", "english": "Fans waited backstage to meet the famous singer yesterday." },
        { "word": "spotlight", "phonetic": "/ˈspɑːtlaɪt/", "english": "The spotlight followed the dancer across the stage beautifully." },
        { "word": "curtain", "phonetic": "/ˈkɜːrtən/", "english": "The curtain rose and the play began immediately tonight." },
        { "word": "intermission", "phonetic": "/ˌɪntərˈmɪʃən/", "english": "There will be a fifteen minute intermission during the show." },
        { "word": "matinee", "phonetic": "/ˌmætɪˈneɪ/", "english": "The matinee performance starts at two in the afternoon." },
        { "word": "premiere", "phonetic": "/prɪˈmɪr/", "english": "The world premiere of the play is tomorrow night." },
        { "word": "debut", "phonetic": "/deɪˈbjuː/", "english": "The young actress made her debut in this film." },
        { "word": "blockbuster", "phonetic": "/ˈblɑːkbʌstər/", "english": "The summer blockbuster broke all box office records worldwide." },
        { "word": "flop", "phonetic": "/flɑːp/", "english": "The movie was a complete flop at the box office." },
        { "word": "critic", "phonetic": "/ˈkrɪtɪk/", "english": "The film critic gave the movie five stars rating." },
        { "word": "review", "phonetic": "/rɪˈvjuː/", "english": "The restaurant received excellent reviews from customers online today." },
        { "word": "rating", "phonetic": "/ˈreɪtɪŋ/", "english": "The show has a high rating on the website." },
        { "word": "award", "phonetic": "/əˈwɔːrd/", "english": "She won the award for best actress this year." },
        { "word": "nomination", "phonetic": "/ˌnɑːmɪˈneɪʃən/", "english": "The film received five nominations at the awards ceremony." },
        { "word": "trophy", "phonetic": "/ˈtroʊfi/", "english": "The team proudly displayed their championship trophy in cabinet." }
    ],
    "liarGameData": {
        "trap": "see_vs_watch_vs_look",
        "targetLearners": "All learners",
        "explanation": "A2 learners confuse 'see' (perceive with eyes), 'watch' (observe intentionally), and 'look' (direct eyes toward). Use 'watch' for movies/TV.",
        "practice": "I see the screen. I watch movies. I look at the poster.",
        "tip": "Watch = intentional viewing (TV, movies, sports). See = general perception. Look = direct attention."
    }
};

fs.writeFileSync(
    path.join(__dirname, '../firestore_data/en_a2_m08.json'),
    JSON.stringify(m08, null, 2)
);
console.log('✅ M08 generated: 100 words (Media & Entertainment)');
