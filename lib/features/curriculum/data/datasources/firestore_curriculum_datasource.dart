import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/module_model.dart';
import '../models/lesson_model.dart';
import '../models/liar_game_model.dart';

/// Datasource for fetching curriculum data from Firestore
/// Handles the languages/{lang}/levels/{level}/modules path structure
class FirestoreCurriculumDatasource {
  final FirebaseFirestore _firestore;

  FirestoreCurriculumDatasource({FirebaseFirestore? firestore})
      : _firestore = firestore ?? FirebaseFirestore.instance;

  /// Fetches all modules for a given language and level from Firestore
  /// 
  /// Path: languages/{language}/levels/{level}/modules
  /// Example: languages/spanish/levels/a2/modules
  Future<List<ModuleModel>> fetchModules(String language, String level) async {
    try {
      print('🔥 Fetching modules from Firestore: $language / $level');
      
      final snapshot = await _firestore
          .collection('languages')
          .doc(language.toLowerCase())
          .collection('levels')
          .doc(level.toLowerCase())
          .collection('modules')
          .orderBy('order')
          .get();

      print('✅ Firestore returned ${snapshot.docs.length} modules');

      final modules = snapshot.docs.map((doc) {
        final data = doc.data();
        print('📦 Processing module: ${data['moduleId'] ?? doc.id}');
        
        return _mapFirestoreToModule(data, doc.id);
      }).toList();

      print('✅ Successfully mapped ${modules.length} modules');
      return modules;
    } catch (e, stackTrace) {
      print('❌ Error fetching modules from Firestore: $e');
      print('Stack trace: $stackTrace');
      rethrow;
    }
  }

  /// Maps Firestore document data to ModuleModel
  /// Handles field name differences between Firestore and Dart models
  ModuleModel _mapFirestoreToModule(Map<String, dynamic> data, String docId) {
    // Extract lessons - handle both array of objects and vocabularyItems
    final List<LessonModel> lessons = _extractLessons(data);
    
    // Extract liar game data
    final LiarGameModel liarGameData = _extractLiarGameData(data);

    return ModuleModel(
      id: data['moduleId'] ?? data['module_id'] ?? docId,
      theme: data['theme'] ?? 'Unknown Theme',
      lessons: lessons,
      liarGameData: liarGameData,
    );
  }

  /// Extracts lessons from Firestore data
  /// Handles multiple formats: nested lessons with vocabulary, vocabularyItems array, or sampleVocab
  List<LessonModel> _extractLessons(Map<String, dynamic> data) {
    // NEW: Try nested 'lessons' field with vocabulary arrays (Chinese/Italian format)
    if (data['lessons'] != null && data['lessons'] is List) {
      final lessonsList = data['lessons'] as List;
      
      // Check if this is the new nested format (each lesson has vocabulary array)
      if (lessonsList.isNotEmpty && lessonsList.first is Map) {
        final firstLesson = lessonsList.first as Map;
        
        if (firstLesson['vocabulary'] != null && firstLesson['vocabulary'] is List) {
          // New nested format: flatten all vocabulary from all lessons
          print('📚 Using nested lessons format with vocabulary arrays');
          final allVocab = <LessonModel>[];
          
          for (final lesson in lessonsList) {
            if (lesson is Map && lesson['vocabulary'] is List) {
              final vocabList = lesson['vocabulary'] as List;
              
              for (final vocabItem in vocabList) {
                if (vocabItem is Map) {
                  allVocab.add(LessonModel(
                    targetText: vocabItem['word'] ?? '',
                    english: vocabItem['translation'] ?? '',
                    phoneticTranscription: vocabItem['phonetic'] ?? '',
                    radicalBreakdown: vocabItem['liarGame'] == true 
                        ? 'Liar Game Trap!' 
                        : null,
                  ));
                }
              }
            }
          }
          
          print('✅ Extracted ${allVocab.length} words from nested lessons');
          return allVocab;
        }
        
        // Old flat lessons format (direct lesson objects)
        return lessonsList.map((lessonData) {
          return LessonModel(
            targetText: lessonData['targetText'] ?? lessonData['target_text'] ?? '',
            english: lessonData['english'] ?? '',
            phoneticTranscription: lessonData['phoneticTranscription'] ?? 
                                   lessonData['phonetic_transcription'] ?? '',
            radicalBreakdown: lessonData['radicalBreakdown'] ?? 
                             lessonData['radical_breakdown'],
          );
        }).toList();
      }
    }

    // Try 'vocabularyItems' field (array of strings or objects)
    if (data['vocabularyItems'] != null && data['vocabularyItems'] is List) {
      final vocabList = data['vocabularyItems'] as List;
      
      return vocabList.map((item) {
        if (item is String) {
          // Format: "word (reading) meaning"
          final parts = _parseVocabularyString(item);
          return LessonModel(
            targetText: parts['target'] ?? item,
            english: parts['english'] ?? '',
            phoneticTranscription: parts['phonetic'] ?? '',
          );
        } else if (item is Map) {
          // Format: object with fields
          return LessonModel(
            targetText: item['targetText'] ?? item['word'] ?? item['kanji'] ?? '',
            english: item['english'] ?? item['meaning'] ?? '',
            phoneticTranscription: item['phoneticTranscription'] ?? 
                                  item['reading'] ?? '',
            radicalBreakdown: item['radicalBreakdown'] ?? item['notes'],
          );
        }
        return LessonModel(
          targetText: item.toString(),
          english: '',
          phoneticTranscription: '',
        );
      }).toList();
    }

    // Try 'sampleVocab' field (module structure format)
    if (data['sampleVocab'] != null && data['sampleVocab'] is List) {
      return (data['sampleVocab'] as List).map((item) {
        final parts = _parseVocabularyString(item.toString());
        return LessonModel(
          targetText: parts['target'] ?? item.toString(),
          english: parts['english'] ?? '',
          phoneticTranscription: parts['phonetic'] ?? '',
        );
      }).toList();
    }

    // Fallback: create a placeholder lesson
    print('⚠️ No lessons found, creating placeholder');
    return [
      LessonModel(
        targetText: data['theme'] ?? 'Content',
        english: data['description'] ?? 'Module content',
        phoneticTranscription: '',
      ),
    ];
  }

  /// Parses vocabulary string format: "word (reading) meaning"
  /// Example: "먹다 (meokda) to eat"
  Map<String, String> _parseVocabularyString(String vocab) {
    final result = <String, String>{};
    
    // Try to extract: target (phonetic) english
    final regex = RegExp(r'^([^\(]+)\s*\(([^\)]+)\)\s*(.*)$');
    final match = regex.firstMatch(vocab);
    
    if (match != null) {
      result['target'] = match.group(1)?.trim() ?? '';
      result['phonetic'] = match.group(2)?.trim() ?? '';
      result['english'] = match.group(3)?.trim() ?? '';
    } else {
      // Fallback: just use the whole string as target
      result['target'] = vocab;
      result['english'] = '';
      result['phonetic'] = '';
    }
    
    return result;
  }

  /// Extracts liar game data from Firestore document
  LiarGameModel _extractLiarGameData(Map<String, dynamic> data) {
    final liarData = data['liarGameData'] ?? data['liar_game_data'];
    
    if (liarData != null && liarData is Map) {
      return LiarGameModel(
        trap: liarData['question'] ?? liarData['liarAnswer'] ?? liarData['trap'] ?? 'No trap',
        correctVersion: liarData['correctAnswer'] ?? liarData['correct_version'] ?? liarData['correctVersion'] ?? 'Correct version',
        explanation: liarData['explanation'] ?? 'No explanation available',
      );
    }

    // Fallback liar game data
    return LiarGameModel(
      trap: 'Practice makes perfect',
      correctVersion: 'Keep learning!',
      explanation: 'This module focuses on ${data['theme'] ?? 'language learning'}',
    );
  }

  /// Stream version of fetchModules for real-time updates
  Stream<List<ModuleModel>> watchModules(String language, String level) {
    return _firestore
        .collection('languages')
        .doc(language.toLowerCase())
        .collection('levels')
        .doc(level.toLowerCase())
        .collection('modules')
        .orderBy('order')
        .snapshots()
        .map((snapshot) {
      return snapshot.docs.map((doc) {
        return _mapFirestoreToModule(doc.data(), doc.id);
      }).toList();
    });
  }
}
