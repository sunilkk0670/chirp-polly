// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'liar_game_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$LiarGameModelImpl _$$LiarGameModelImplFromJson(Map<String, dynamic> json) =>
    _$LiarGameModelImpl(
      trap: json['trap'] as String,
      correctVersion: json['correct_version'] as String,
      explanation: json['explanation'] as String,
    );

Map<String, dynamic> _$$LiarGameModelImplToJson(_$LiarGameModelImpl instance) =>
    <String, dynamic>{
      'trap': instance.trap,
      'correct_version': instance.correctVersion,
      'explanation': instance.explanation,
    };
