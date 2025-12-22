import 'package:freezed_annotation/freezed_annotation.dart';
import 'module_model.dart';

part 'language_curriculum_model.freezed.dart';
part 'language_curriculum_model.g.dart';

/// Represents a complete language curriculum (e.g., Japanese A1)
@freezed
class LanguageCurriculumModel with _$LanguageCurriculumModel {
  const factory LanguageCurriculumModel({
    /// Language name (e.g., "Japanese", "Hindi", "French")
    required String language,
    
    /// CEFR level (e.g., "A1", "A2", "B1")
    required String level,
    
    /// List of modules in this curriculum
    required List<ModuleModel> modules,
  }) = _LanguageCurriculumModel;

  /// Creates a LanguageCurriculumModel from JSON
  factory LanguageCurriculumModel.fromJson(Map<String, dynamic> json) =>
      _$LanguageCurriculumModelFromJson(json);
}
