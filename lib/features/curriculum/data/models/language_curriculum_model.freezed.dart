// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'language_curriculum_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

LanguageCurriculumModel _$LanguageCurriculumModelFromJson(
    Map<String, dynamic> json) {
  return _LanguageCurriculumModel.fromJson(json);
}

/// @nodoc
mixin _$LanguageCurriculumModel {
  /// Language name (e.g., "Japanese", "Hindi", "French")
  String get language => throw _privateConstructorUsedError;

  /// CEFR level (e.g., "A1", "A2", "B1")
  String get level => throw _privateConstructorUsedError;

  /// List of modules in this curriculum
  List<ModuleModel> get modules => throw _privateConstructorUsedError;

  /// Serializes this LanguageCurriculumModel to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of LanguageCurriculumModel
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $LanguageCurriculumModelCopyWith<LanguageCurriculumModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $LanguageCurriculumModelCopyWith<$Res> {
  factory $LanguageCurriculumModelCopyWith(LanguageCurriculumModel value,
          $Res Function(LanguageCurriculumModel) then) =
      _$LanguageCurriculumModelCopyWithImpl<$Res, LanguageCurriculumModel>;
  @useResult
  $Res call({String language, String level, List<ModuleModel> modules});
}

/// @nodoc
class _$LanguageCurriculumModelCopyWithImpl<$Res,
        $Val extends LanguageCurriculumModel>
    implements $LanguageCurriculumModelCopyWith<$Res> {
  _$LanguageCurriculumModelCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of LanguageCurriculumModel
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? language = null,
    Object? level = null,
    Object? modules = null,
  }) {
    return _then(_value.copyWith(
      language: null == language
          ? _value.language
          : language // ignore: cast_nullable_to_non_nullable
              as String,
      level: null == level
          ? _value.level
          : level // ignore: cast_nullable_to_non_nullable
              as String,
      modules: null == modules
          ? _value.modules
          : modules // ignore: cast_nullable_to_non_nullable
              as List<ModuleModel>,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$LanguageCurriculumModelImplCopyWith<$Res>
    implements $LanguageCurriculumModelCopyWith<$Res> {
  factory _$$LanguageCurriculumModelImplCopyWith(
          _$LanguageCurriculumModelImpl value,
          $Res Function(_$LanguageCurriculumModelImpl) then) =
      __$$LanguageCurriculumModelImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String language, String level, List<ModuleModel> modules});
}

/// @nodoc
class __$$LanguageCurriculumModelImplCopyWithImpl<$Res>
    extends _$LanguageCurriculumModelCopyWithImpl<$Res,
        _$LanguageCurriculumModelImpl>
    implements _$$LanguageCurriculumModelImplCopyWith<$Res> {
  __$$LanguageCurriculumModelImplCopyWithImpl(
      _$LanguageCurriculumModelImpl _value,
      $Res Function(_$LanguageCurriculumModelImpl) _then)
      : super(_value, _then);

  /// Create a copy of LanguageCurriculumModel
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? language = null,
    Object? level = null,
    Object? modules = null,
  }) {
    return _then(_$LanguageCurriculumModelImpl(
      language: null == language
          ? _value.language
          : language // ignore: cast_nullable_to_non_nullable
              as String,
      level: null == level
          ? _value.level
          : level // ignore: cast_nullable_to_non_nullable
              as String,
      modules: null == modules
          ? _value._modules
          : modules // ignore: cast_nullable_to_non_nullable
              as List<ModuleModel>,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$LanguageCurriculumModelImpl implements _LanguageCurriculumModel {
  const _$LanguageCurriculumModelImpl(
      {required this.language,
      required this.level,
      required final List<ModuleModel> modules})
      : _modules = modules;

  factory _$LanguageCurriculumModelImpl.fromJson(Map<String, dynamic> json) =>
      _$$LanguageCurriculumModelImplFromJson(json);

  /// Language name (e.g., "Japanese", "Hindi", "French")
  @override
  final String language;

  /// CEFR level (e.g., "A1", "A2", "B1")
  @override
  final String level;

  /// List of modules in this curriculum
  final List<ModuleModel> _modules;

  /// List of modules in this curriculum
  @override
  List<ModuleModel> get modules {
    if (_modules is EqualUnmodifiableListView) return _modules;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_modules);
  }

  @override
  String toString() {
    return 'LanguageCurriculumModel(language: $language, level: $level, modules: $modules)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$LanguageCurriculumModelImpl &&
            (identical(other.language, language) ||
                other.language == language) &&
            (identical(other.level, level) || other.level == level) &&
            const DeepCollectionEquality().equals(other._modules, _modules));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, language, level,
      const DeepCollectionEquality().hash(_modules));

  /// Create a copy of LanguageCurriculumModel
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$LanguageCurriculumModelImplCopyWith<_$LanguageCurriculumModelImpl>
      get copyWith => __$$LanguageCurriculumModelImplCopyWithImpl<
          _$LanguageCurriculumModelImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$LanguageCurriculumModelImplToJson(
      this,
    );
  }
}

abstract class _LanguageCurriculumModel implements LanguageCurriculumModel {
  const factory _LanguageCurriculumModel(
          {required final String language,
          required final String level,
          required final List<ModuleModel> modules}) =
      _$LanguageCurriculumModelImpl;

  factory _LanguageCurriculumModel.fromJson(Map<String, dynamic> json) =
      _$LanguageCurriculumModelImpl.fromJson;

  /// Language name (e.g., "Japanese", "Hindi", "French")
  @override
  String get language;

  /// CEFR level (e.g., "A1", "A2", "B1")
  @override
  String get level;

  /// List of modules in this curriculum
  @override
  List<ModuleModel> get modules;

  /// Create a copy of LanguageCurriculumModel
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$LanguageCurriculumModelImplCopyWith<_$LanguageCurriculumModelImpl>
      get copyWith => throw _privateConstructorUsedError;
}
