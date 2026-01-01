import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
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
      case 'spanish':
        return 'es-ES';
      case 'german':
        return 'de-DE';
      case 'italian':
        return 'it-IT';
      case 'punjabi':
        return 'pa-IN';
      case 'dutch':
        return 'nl-NL';
      case 'portuguese':
        return 'pt-PT';
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
    // Extract vocabulary items - handle both flat and nested structures
    final vocabularyItems = _extractVocabularyItems(widget.moduleData);
    final liarGameData = (widget.moduleData['liarGameData'] ?? widget.moduleData['liar_game_data']) as Map<String, dynamic>?;

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.white,
        forceMaterialTransparency: false,
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
                          '${widget.languageName} - ${vocabularyItems.length} words',
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
              ...vocabularyItems.asMap().entries.map((entry) {
                final index = entry.key;
                final item = entry.value;
                return _buildVocabularyCard(context, item, index + 1);
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
                                lessons: vocabularyItems,
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

  /// Extracts vocabulary items from module data
  /// Handles both flat structure (lessons array) and nested structure (lessons with vocabularyItems)
  List<Map<String, dynamic>> _extractVocabularyItems(Map<String, dynamic> moduleData) {
    final List<Map<String, dynamic>> items = [];
    
    print('🔍 Extracting vocabulary from module: ${moduleData['theme']}');
    print('📦 Module keys: ${moduleData.keys.toList()}');

    // Unified extraction and standardization logic
    List<dynamic>? rawItems;
    if (moduleData['vocabularyItems'] != null && moduleData['vocabularyItems'] is List) {
      rawItems = moduleData['vocabularyItems'] as List;
      print('📝 Processing direct vocabularyItems');
    } else if (moduleData['lessons'] != null && moduleData['lessons'] is List) {
      final lessons = moduleData['lessons'] as List;
      print('📚 Processing lessons array');
      // If nested, flatten it. If not, just use the lessons as items.
      for (var lesson in lessons) {
        if (lesson is Map && lesson['vocabularyItems'] != null && lesson['vocabularyItems'] is List) {
          rawItems ??= [];
          rawItems.addAll(lesson['vocabularyItems'] as List);
        } else {
          rawItems ??= [];
          rawItems.add(lesson);
        }
      }
    }

    if (rawItems != null) {
      for (var rawItem in rawItems) {
        if (rawItem is Map) {
          final mapped = Map<String, dynamic>.from(rawItem);
          final standardized = {
            'target_text': mapped['word'] ?? mapped['targetText'] ?? mapped['target_text'] ?? mapped['target_text'] ?? mapped['kanji'] ?? '[LOADING ERROR]',
            'english': mapped['meaning'] ?? mapped['english'] ?? mapped['translation'] ?? '[LOADING ERROR]',
            'phonetic_transcription': mapped['reading'] ?? mapped['phoneticTranscription'] ?? mapped['phonetic_transcription'] ?? mapped['romaji'] ?? mapped['phonetic'] ?? '',
            'radical_breakdown': mapped['radical_breakdown'] ?? mapped['radicalBreakdown'],
            'example_sentence': mapped['example_sentence'] ?? mapped['example'] ?? '',
          };
          items.add(standardized);
        } else if (rawItem is String) {
          items.add(_parseVocabularyString(rawItem));
        }
      }
    }

    print('✅ Extracted ${items.length} total vocabulary items');
    if (items.isNotEmpty) {
      print('First item keys: ${items.first.keys.toList()}');
      print('First item: ${items.first}');
    }
    
    return items;
  }

  /// Parses vocabulary string format: "word (reading) meaning"
  Map<String, dynamic> _parseVocabularyString(String vocab) {
    final regex = RegExp(r'^([^\(]+)\s*\(([^\)]+)\)\s*(.*)$');
    final match = regex.firstMatch(vocab);
    
    if (match != null) {
      return {
        'targetText': match.group(1)?.trim() ?? '',
        'phoneticTranscription': match.group(2)?.trim() ?? '',
        'romaji': match.group(2)?.trim() ?? '',
        'english': match.group(3)?.trim() ?? '',
      };
    }
    
    return {
      'targetText': vocab,
      'english': '',
      'phoneticTranscription': '',
    };
  }

  Widget _buildVocabularyCard(BuildContext context, Map<String, dynamic> lesson, int number) {
    print('🎴 Rendering card $number. target_text: ${lesson['target_text']}, english: ${lesson['english']}');
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
                // Target text (Japanese/Hindi/French/Korean)
                // Target text
                Text(
                  lesson['target_text'] ?? '[LOADING ERROR]',
                  style: _getTargetTextStyle(widget.languageId).copyWith(
                    color: (lesson['target_text'] == '[LOADING ERROR]') ? Colors.red : Colors.black,
                  ),
                ),
                const SizedBox(height: 8),

                // Phonetic transcription
                if (lesson['phonetic_transcription'] != null && lesson['phonetic_transcription'].toString().isNotEmpty) ...[
                  Text(
                    lesson['phonetic_transcription'],
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
                  lesson['english'] ?? '[LOADING ERROR]',
                  style: TextStyle(
                    fontSize: 16,
                    color: (lesson['english'] == '[LOADING ERROR]') ? Colors.red : Colors.grey.shade700,
                  ),
                ),

                // Radical breakdown (for Japanese)
                if (lesson['radicalBreakdown'] != null || lesson['radical_breakdown'] != null) ...[
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Colors.blue.shade50,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      lesson['radicalBreakdown'] ?? lesson['radical_breakdown'] ?? '',
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
            onPressed: () => _speak(
              lesson['target_text'] ?? ''
            ),
          ),
        ],
      ),
    );
  }

  TextStyle _getTargetTextStyle(String languageId) {
    final baseStyle = const TextStyle(
      fontSize: 32,
      fontWeight: FontWeight.bold,
      height: 1.2,
      color: Colors.black,
    );

    switch (languageId.toLowerCase()) {
      case 'japanese':
        return GoogleFonts.notoSansJp(textStyle: baseStyle);
      case 'korean':
        return GoogleFonts.notoSansKr(textStyle: baseStyle);
      case 'hindi':
      case 'sanskrit':
        return GoogleFonts.notoSansDevanagari(textStyle: baseStyle);
      default:
        return GoogleFonts.notoSans(textStyle: baseStyle);
    }
  }
}
