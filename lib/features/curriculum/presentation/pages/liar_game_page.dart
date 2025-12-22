import 'package:flutter/material.dart';
import '../services/web_tts_service.dart';
import '../widgets/chirpolly_logo.dart';

class LiarGamePage extends StatefulWidget {
  final String languageId;
  final String languageName;
  final List<dynamic> lessons;
  final Map<String, dynamic> liarGameData;
  final String flag;

  const LiarGamePage({
    super.key,
    required this.languageId,
    required this.languageName,
    required this.lessons,
    required this.liarGameData,
    required this.flag,
  });

  @override
  State<LiarGamePage> createState() => _LiarGamePageState();
}

class _LiarGamePageState extends State<LiarGamePage> {
  int currentQuestionIndex = 0;
  int score = 0;
  bool hasAnswered = false;
  bool? selectedAnswer;

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
    if (currentQuestionIndex >= widget.lessons.length) {
      return _buildCompletionScreen();
    }

    final currentLesson = widget.lessons[currentQuestionIndex];
    final isLiarQuestion = currentQuestionIndex == widget.lessons.length - 1;

    return Scaffold(
      backgroundColor: Colors.deepPurple.shade50,
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.deepPurple.shade700,
        toolbarHeight: 80,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: MouseRegion(
          cursor: SystemMouseCursors.click,
          child: GestureDetector(
            onTap: () {
              Navigator.of(context).popUntil((route) => route.isFirst);
            },
            child: const ChirPollyLogo(fontSize: 24, isWhite: true),
          ),
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(
              'Score: $score/${widget.lessons.length}',
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Center(
          child: Container(
            constraints: const BoxConstraints(maxWidth: 600),
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Progress indicator
                LinearProgressIndicator(
                  value: (currentQuestionIndex + 1) / widget.lessons.length,
                  backgroundColor: Colors.grey.shade300,
                  valueColor: AlwaysStoppedAnimation<Color>(Colors.deepPurple.shade700),
                ),
                const SizedBox(height: 32),

                // Question card
                Card(
                  elevation: 8,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                  child: Padding(
                    padding: const EdgeInsets.all(32),
                    child: Column(
                      children: [
                        Text(
                          'Question ${currentQuestionIndex + 1} of ${widget.lessons.length}',
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.grey.shade600,
                          ),
                        ),
                        const SizedBox(height: 24),

                        // Target text with speaker
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              currentLesson['targetText'] ?? '',
                              style: const TextStyle(
                                fontSize: 48,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            IconButton(
                              icon: Icon(Icons.volume_up, size: 32, color: Colors.deepPurple.shade700),
                              onPressed: () => _speak(currentLesson['targetText'] ?? ''),
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),

                        if (isLiarQuestion) ...[
                          Container(
                            padding: const EdgeInsets.all(16),
                            decoration: BoxDecoration(
                              color: Colors.amber.shade100,
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Text(
                              '⚠️ Watch out! This one might be tricky!',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: Colors.amber.shade900,
                              ),
                            ),
                          ),
                          const SizedBox(height: 16),
                        ],

                        Text(
                          'Does this mean:',
                          style: TextStyle(fontSize: 18, color: Colors.grey.shade700),
                        ),
                        const SizedBox(height: 24),

                        // Answer options
                        _buildAnswerButton(
                          currentLesson['english'] ?? '',
                          true,
                          isLiarQuestion,
                        ),
                        const SizedBox(height: 12),
                        _buildAnswerButton(
                          _getWrongAnswer(currentLesson['english'] ?? ''),
                          false,
                          isLiarQuestion,
                        ),

                        if (hasAnswered) ...[
                          const SizedBox(height: 24),
                          _buildFeedback(isLiarQuestion),
                        ],
                      ],
                    ),
                  ),
                ),

                if (hasAnswered) ...[
                  const SizedBox(height: 24),
                  ElevatedButton(
                    onPressed: _nextQuestion,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.deepPurple.shade700,
                      padding: const EdgeInsets.symmetric(horizontal: 48, vertical: 16),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    child: Text(
                      currentQuestionIndex < widget.lessons.length - 1 ? 'Next Question' : 'Finish',
                      style: const TextStyle(fontSize: 18, color: Colors.white),
                    ),
                  ),
                  const SizedBox(height: 24), // Extra padding at bottom
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildAnswerButton(String text, bool isCorrect, bool isLiarQuestion) {
    Color? buttonColor;
    if (hasAnswered) {
      if (isCorrect) {
        buttonColor = Colors.green.shade100;
      } else if (selectedAnswer == isCorrect) {
        buttonColor = Colors.red.shade100;
      }
    }

    return InkWell(
      onTap: hasAnswered ? null : () => _checkAnswer(isCorrect, isLiarQuestion),
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: buttonColor ?? Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: hasAnswered && isCorrect ? Colors.green : Colors.grey.shade300,
            width: 2,
          ),
        ),
        child: Text(
          text,
          style: const TextStyle(fontSize: 18),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }

  Widget _buildFeedback(bool isLiarQuestion) {
    final isCorrect = selectedAnswer == true;
    
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isCorrect ? Colors.green.shade50 : Colors.red.shade50,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: isCorrect ? Colors.green : Colors.red,
          width: 2,
        ),
      ),
      child: Column(
        children: [
          Row(
            children: [
              Icon(
                isCorrect ? Icons.check_circle : Icons.cancel,
                color: isCorrect ? Colors.green : Colors.red,
                size: 32,
              ),
              const SizedBox(width: 12),
              Text(
                isCorrect ? 'Correct!' : 'Incorrect!',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: isCorrect ? Colors.green.shade900 : Colors.red.shade900,
                ),
              ),
            ],
          ),
          if (isLiarQuestion && !isCorrect) ...[
            const SizedBox(height: 12),
            Text(
              widget.liarGameData['explanation'] ?? '',
              style: TextStyle(color: Colors.grey.shade800),
            ),
          ],
        ],
      ),
    );
  }

  void _checkAnswer(bool isCorrect, bool isLiarQuestion) {
    setState(() {
      hasAnswered = true;
      selectedAnswer = isCorrect;
      if (isCorrect) {
        score++;
      }
    });
  }

  void _nextQuestion() {
    setState(() {
      currentQuestionIndex++;
      hasAnswered = false;
      selectedAnswer = null;
    });
  }

  String _getWrongAnswer(String correctAnswer) {
    final wrongAnswers = [
      'Thank you',
      'Goodbye',
      'Please',
      'Sorry',
      'Excuse me',
      'Good morning',
      'Good night',
      'See you later',
    ];
    wrongAnswers.remove(correctAnswer);
    wrongAnswers.shuffle();
    return wrongAnswers.first;
  }

  Widget _buildCompletionScreen() {
    final percentage = (score / widget.lessons.length * 100).round();
    
    return Scaffold(
      backgroundColor: Colors.deepPurple.shade50,
      body: Center(
        child: Container(
          constraints: const BoxConstraints(maxWidth: 600),
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Success animation
              Text(
                '🎉',
                style: const TextStyle(fontSize: 120),
              ),
              const SizedBox(height: 24),
              
              Text(
                'Congratulations!',
                style: TextStyle(
                  fontSize: 36,
                  fontWeight: FontWeight.bold,
                  color: Colors.deepPurple.shade900,
                ),
              ),
              const SizedBox(height: 16),
              
              Text(
                'You scored $score out of ${widget.lessons.length}',
                style: const TextStyle(fontSize: 24),
              ),
              const SizedBox(height: 8),
              
              Text(
                '$percentage%',
                style: TextStyle(
                  fontSize: 48,
                  fontWeight: FontWeight.bold,
                  color: percentage >= 80 ? Colors.green : Colors.orange,
                ),
              ),
              const SizedBox(height: 32),
              
              if (percentage >= 80) ...[
                Text(
                  'Excellent work! 🌟',
                  style: TextStyle(fontSize: 20, color: Colors.green.shade700),
                ),
              ] else if (percentage >= 60) ...[
                Text(
                  'Good job! Keep practicing! 💪',
                  style: TextStyle(fontSize: 20, color: Colors.orange.shade700),
                ),
              ] else ...[
                Text(
                  'Keep learning! You\'ll get better! 📚',
                  style: TextStyle(fontSize: 20, color: Colors.blue.shade700),
                ),
              ],
              
              const SizedBox(height: 48),
              
              ElevatedButton(
                onPressed: () => Navigator.pop(context),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.deepPurple.shade700,
                  padding: const EdgeInsets.symmetric(horizontal: 48, vertical: 20),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: const Text(
                  'Back to Modules',
                  style: TextStyle(fontSize: 18, color: Colors.white),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
