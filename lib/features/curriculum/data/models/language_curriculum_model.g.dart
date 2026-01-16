// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'language_curriculum_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$LanguageCurriculumModelImpl _$$LanguageCurriculumModelImplFromJson(
        Map<String, dynamic> json) =>
    _$LanguageCurriculumModelImpl(
      language: json['language'] as String,
      level: json['level'] as String,
      modules: (json['modules'] as List<dynamic>)
          .map((e) => ModuleModel.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$$LanguageCurriculumModelImplToJson(
        _$LanguageCurriculumModelImpl instance) =>
    <String, dynamic>{
      'language': instance.language,
      'level': instance.level,
      'modules': instance.modules,
    };
