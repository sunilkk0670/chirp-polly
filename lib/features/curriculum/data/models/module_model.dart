import 'package:freezed_annotation/freezed_annotation.dart';
import 'lesson_model.dart';
import 'liar_game_model.dart';

part 'module_model.freezed.dart';
part 'module_model.g.dart';

/// Represents a module within a language curriculum (e.g., "Greetings & Introductions")
@freezed
class ModuleModel with _$ModuleModel {
  const factory ModuleModel({
    /// Unique identifier for the module (e.g., "jp_a1_m1")
    required String id,
    
    /// Theme or topic of the module
    required String theme,
    
    /// List of lessons in this module
    required List<LessonModel> lessons,
    
    /// Associated liar game data for this module
    @JsonKey(name: 'liar_game_data') required LiarGameModel liarGameData,
  }) = _ModuleModel;

  /// Creates a ModuleModel from JSON
  factory ModuleModel.fromJson(Map<String, dynamic> json) =>
      _$ModuleModelFromJson(json);
}
