// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'lesson_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$LessonModelImpl _$$LessonModelImplFromJson(Map<String, dynamic> json) =>
    _$LessonModelImpl(
      targetText: json['target_text'] as String,
      english: json['english'] as String,
      phoneticTranscription: json['phonetic_transcription'] as String,
      radicalBreakdown: json['radical_breakdown'] as String?,
    );

Map<String, dynamic> _$$LessonModelImplToJson(_$LessonModelImpl instance) =>
    <String, dynamic>{
      'target_text': instance.targetText,
      'english': instance.english,
      'phonetic_transcription': instance.phoneticTranscription,
      'radical_breakdown': instance.radicalBreakdown,
    };
