import 'package:flutter/material.dart';
import '../services/web_tts_service.dart';
import '../widgets/chirpolly_logo.dart';
import 'liar_game_page.dart';

class LessonContentPage extends StatefulWidget {
  final String languageId;
  final String languageName;
  final String levelId;
  final String moduleTheme;
  final Map<String, dynamic> moduleData;
  final String flag;

  const LessonContentPage({
    super.key,
    required this.languageId,
    required this.languageName,
    required this.levelId,
    required this.moduleTheme,
    required this.moduleData,
    required this.flag,
  });

  @override
  State<LessonContentPage> createState() => _LessonContentPageState();
}

class _LessonContentPageState extends State<LessonContentPage> {
  String get languageCode => _getLanguageCode(widget.languageId);

  String _getLanguageCode(String languageId) {
    switch (languageId.toLowerCase()) {
      case 'japanese':
        return 'ja-JP';
      case 'hindi':
        return 'hi-IN';
      case 'french':
        return 'fr-FR';
      case 'korean':
        return 'ko-KR';
      case 'chinese':
        return 'zh-CN';
      case 'sanskrit':
        return 'hi-IN'; // Use Hindi voice for Sanskrit (same Devanagari script)
      default:
        return 'en-US';
    }
  }

  void _speak(String text) {
    WebTtsService.speak(text, languageCode);
  }

  @override
  void dispose() {
    WebTtsService.stop();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final lessons = (widget.moduleData['lessons'] as List<dynamic>?) ?? [];
    final liarGameData = widget.moduleData['liarGameData'] as Map<String, dynamic>?;

    return Scaffold(
      backgroundColor: Colors.grey.shade50,
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.transparent,
        forceMaterialTransparency: true,
        toolbarHeight: 80,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: MouseRegion(
          cursor: SystemMouseCursors.click,
          child: GestureDetector(
            onTap: () {
              Navigator.of(context).popUntil((route) => route.isFirst);
            },
            child: const ChirPollyLogo(fontSize: 24),
          ),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Container(
          constraints: const BoxConstraints(maxWidth: 800),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Module Header
              Row(
                children: [
                  Text(widget.flag, style: const TextStyle(fontSize: 32)),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget.moduleTheme,
                          style: const TextStyle(
                            fontSize: 28,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          '${widget.languageName} - ${lessons.length} words',
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.grey.shade600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 32),

              // Vocabulary Section
              Text(
                'Vocabulary',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Colors.grey.shade800,
                ),
              ),
              const SizedBox(height: 16),

              // Vocabulary Cards
              ...lessons.asMap().entries.map((entry) {
                final index = entry.key;
                final lesson = entry.value;
                return _buildVocabularyCard(context, lesson, index + 1);
              }).toList(),

              const SizedBox(height: 32),

              // Liar Game Section
              if (liarGameData != null) ...[
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [
                        Colors.amber.shade100,
                        Colors.orange.shade100,
                      ],
                    ),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: Colors.amber.shade700, width: 2),
                  ),
                  child: Column(
                    children: [
                      Icon(
                        Icons.psychology,
                        size: 48,
                        color: Colors.amber.shade900,
                      ),
                      const SizedBox(height: 12),
                      Text(
                        'Ready for a Challenge?',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: Colors.amber.shade900,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Test your knowledge with the Liar Game!',
                        style: TextStyle(
                          fontSize: 16,
                          color: Colors.grey.shade700,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 20),
                      ElevatedButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => LiarGamePage(
                                languageId: widget.languageId,
                                languageName: widget.languageName,
                                lessons: lessons,
                                liarGameData: liarGameData,
                                flag: widget.flag,
                              ),
                            ),
                          );
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.amber.shade700,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(
                            horizontal: 48,
                            vertical: 16,
                          ),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          elevation: 2,
                        ),
                        child: const Text(
                          'Start Liar Game',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildVocabularyCard(BuildContext context, Map<String, dynamic> lesson, int number) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.shade200),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.03),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Number badge
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: Colors.deepPurple.shade100,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Center(
              child: Text(
                '$number',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.deepPurple.shade700,
                ),
              ),
            ),
          ),
          const SizedBox(width: 16),

          // Content
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Target text (Japanese/Hindi/French)
                Text(
                  lesson['targetText'] ?? '',
                  style: const TextStyle(
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                    height: 1.2,
                  ),
                ),
                const SizedBox(height: 8),

                // Phonetic transcription (Romanization)
                if (lesson['phoneticTranscription'] != null) ...[
                  Text(
                    lesson['phoneticTranscription'],
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.deepPurple.shade600,
                      fontStyle: FontStyle.italic,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 8),
                ],

                // English meaning
                Text(
                  lesson['english'] ?? '',
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.grey.shade700,
                  ),
                ),

                // Radical breakdown (for Japanese)
                if (lesson['radicalBreakdown'] != null) ...[
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Colors.blue.shade50,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      lesson['radicalBreakdown'],
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.blue.shade900,
                      ),
                    ),
                  ),
                ],
              ],
            ),
          ),

          // Speaker icon with TTS
          IconButton(
            icon: Icon(
              Icons.volume_up,
              size: 32,
              color: Colors.deepPurple.shade400,
            ),
            onPressed: () => _speak(lesson['targetText'] ?? ''),
          ),
        ],
      ),
    );
  }
}
