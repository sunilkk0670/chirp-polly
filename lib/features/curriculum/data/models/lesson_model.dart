import 'package:freezed_annotation/freezed_annotation.dart';

part 'lesson_model.freezed.dart';
part 'lesson_model.g.dart';

/// Represents a single lesson in the curriculum
@freezed
class LessonModel with _$LessonModel {
  const factory LessonModel({
    /// The text in the target language (e.g., Japanese, Hindi, French)
    @JsonKey(name: 'target_text') required String targetText,
    
    /// English translation of the target text
    required String english,
    
    /// Phonetic transcription in Devanagari script
    @JsonKey(name: 'phonetic_transcription') required String phoneticTranscription,
    
    /// Optional breakdown of radicals/characters (mainly for Japanese Kanji)
    @JsonKey(name: 'radical_breakdown') String? radicalBreakdown,
  }) = _LessonModel;

  /// Creates a LessonModel from JSON
  factory LessonModel.fromJson(Map<String, dynamic> json) =>
      _$LessonModelFromJson(json);
}
