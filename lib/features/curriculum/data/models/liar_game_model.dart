import 'package:freezed_annotation/freezed_annotation.dart';

part 'liar_game_model.freezed.dart';
part 'liar_game_model.g.dart';

/// Represents the "Liar Game" data for teaching common mistakes and cultural nuances
@freezed
class LiarGameModel with _$LiarGameModel {
  const factory LiarGameModel({
    /// The common mistake or trap that learners often fall into
    required String trap,
    
    /// The correct version or proper usage
    @JsonKey(name: 'correct_version') required String correctVersion,
    
    /// Detailed explanation of why the trap is wrong and cultural/linguistic context
    required String explanation,
  }) = _LiarGameModel;

  /// Creates a LiarGameModel from JSON
  factory LiarGameModel.fromJson(Map<String, dynamic> json) =>
      _$LiarGameModelFromJson(json);
}
