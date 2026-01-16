import 'dart:html' as html;

class TtsService {
  static Future<void> speak(String text, String languageCode) async {
    try {
      final utterance = html.SpeechSynthesisUtterance(text);
      utterance.lang = languageCode;
      utterance.rate = 0.75; // Slightly slower for language learning
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      html.window.speechSynthesis?.speak(utterance);
    } catch (e) {
      print('TTS Error: $e');
    }
  }

  static void stop() {
    try {
      html.window.speechSynthesis?.cancel();
    } catch (e) {
      print('TTS Stop Error: $e');
    }
  }
}

