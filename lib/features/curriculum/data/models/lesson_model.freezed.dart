// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'lesson_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

LessonModel _$LessonModelFromJson(Map<String, dynamic> json) {
  return _LessonModel.fromJson(json);
}

/// @nodoc
mixin _$LessonModel {
  /// The text in the target language (e.g., Japanese, Hindi, French)
  @JsonKey(name: 'target_text')
  String get targetText => throw _privateConstructorUsedError;

  /// English translation of the target text
  String get english => throw _privateConstructorUsedError;

  /// Phonetic transcription in Devanagari script
  @JsonKey(name: 'phonetic_transcription')
  String get phoneticTranscription => throw _privateConstructorUsedError;

  /// Optional breakdown of radicals/characters (mainly for Japanese Kanji)
  @JsonKey(name: 'radical_breakdown')
  String? get radicalBreakdown => throw _privateConstructorUsedError;

  /// Serializes this LessonModel to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of LessonModel
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $LessonModelCopyWith<LessonModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $LessonModelCopyWith<$Res> {
  factory $LessonModelCopyWith(
          LessonModel value, $Res Function(LessonModel) then) =
      _$LessonModelCopyWithImpl<$Res, LessonModel>;
  @useResult
  $Res call(
      {@JsonKey(name: 'target_text') String targetText,
      String english,
      @JsonKey(name: 'phonetic_transcription') String phoneticTranscription,
      @JsonKey(name: 'radical_breakdown') String? radicalBreakdown});
}

/// @nodoc
class _$LessonModelCopyWithImpl<$Res, $Val extends LessonModel>
    implements $LessonModelCopyWith<$Res> {
  _$LessonModelCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of LessonModel
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? targetText = null,
    Object? english = null,
    Object? phoneticTranscription = null,
    Object? radicalBreakdown = freezed,
  }) {
    return _then(_value.copyWith(
      targetText: null == targetText
          ? _value.targetText
          : targetText // ignore: cast_nullable_to_non_nullable
              as String,
      english: null == english
          ? _value.english
          : english // ignore: cast_nullable_to_non_nullable
              as String,
      phoneticTranscription: null == phoneticTranscription
          ? _value.phoneticTranscription
          : phoneticTranscription // ignore: cast_nullable_to_non_nullable
              as String,
      radicalBreakdown: freezed == radicalBreakdown
          ? _value.radicalBreakdown
          : radicalBreakdown // ignore: cast_nullable_to_non_nullable
              as String?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$LessonModelImplCopyWith<$Res>
    implements $LessonModelCopyWith<$Res> {
  factory _$$LessonModelImplCopyWith(
          _$LessonModelImpl value, $Res Function(_$LessonModelImpl) then) =
      __$$LessonModelImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {@JsonKey(name: 'target_text') String targetText,
      String english,
      @JsonKey(name: 'phonetic_transcription') String phoneticTranscription,
      @JsonKey(name: 'radical_breakdown') String? radicalBreakdown});
}

/// @nodoc
class __$$LessonModelImplCopyWithImpl<$Res>
    extends _$LessonModelCopyWithImpl<$Res, _$LessonModelImpl>
    implements _$$LessonModelImplCopyWith<$Res> {
  __$$LessonModelImplCopyWithImpl(
      _$LessonModelImpl _value, $Res Function(_$LessonModelImpl) _then)
      : super(_value, _then);

  /// Create a copy of LessonModel
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? targetText = null,
    Object? english = null,
    Object? phoneticTranscription = null,
    Object? radicalBreakdown = freezed,
  }) {
    return _then(_$LessonModelImpl(
      targetText: null == targetText
          ? _value.targetText
          : targetText // ignore: cast_nullable_to_non_nullable
              as String,
      english: null == english
          ? _value.english
          : english // ignore: cast_nullable_to_non_nullable
              as String,
      phoneticTranscription: null == phoneticTranscription
          ? _value.phoneticTranscription
          : phoneticTranscription // ignore: cast_nullable_to_non_nullable
              as String,
      radicalBreakdown: freezed == radicalBreakdown
          ? _value.radicalBreakdown
          : radicalBreakdown // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$LessonModelImpl implements _LessonModel {
  const _$LessonModelImpl(
      {@JsonKey(name: 'target_text') required this.targetText,
      required this.english,
      @JsonKey(name: 'phonetic_transcription')
      required this.phoneticTranscription,
      @JsonKey(name: 'radical_breakdown') this.radicalBreakdown});

  factory _$LessonModelImpl.fromJson(Map<String, dynamic> json) =>
      _$$LessonModelImplFromJson(json);

  /// The text in the target language (e.g., Japanese, Hindi, French)
  @override
  @JsonKey(name: 'target_text')
  final String targetText;

  /// English translation of the target text
  @override
  final String english;

  /// Phonetic transcription in Devanagari script
  @override
  @JsonKey(name: 'phonetic_transcription')
  final String phoneticTranscription;

  /// Optional breakdown of radicals/characters (mainly for Japanese Kanji)
  @override
  @JsonKey(name: 'radical_breakdown')
  final String? radicalBreakdown;

  @override
  String toString() {
    return 'LessonModel(targetText: $targetText, english: $english, phoneticTranscription: $phoneticTranscription, radicalBreakdown: $radicalBreakdown)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$LessonModelImpl &&
            (identical(other.targetText, targetText) ||
                other.targetText == targetText) &&
            (identical(other.english, english) || other.english == english) &&
            (identical(other.phoneticTranscription, phoneticTranscription) ||
                other.phoneticTranscription == phoneticTranscription) &&
            (identical(other.radicalBreakdown, radicalBreakdown) ||
                other.radicalBreakdown == radicalBreakdown));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, targetText, english,
      phoneticTranscription, radicalBreakdown);

  /// Create a copy of LessonModel
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$LessonModelImplCopyWith<_$LessonModelImpl> get copyWith =>
      __$$LessonModelImplCopyWithImpl<_$LessonModelImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$LessonModelImplToJson(
      this,
    );
  }
}

abstract class _LessonModel implements LessonModel {
  const factory _LessonModel(
          {@JsonKey(name: 'target_text') required final String targetText,
          required final String english,
          @JsonKey(name: 'phonetic_transcription')
          required final String phoneticTranscription,
          @JsonKey(name: 'radical_breakdown') final String? radicalBreakdown}) =
      _$LessonModelImpl;

  factory _LessonModel.fromJson(Map<String, dynamic> json) =
      _$LessonModelImpl.fromJson;

  /// The text in the target language (e.g., Japanese, Hindi, French)
  @override
  @JsonKey(name: 'target_text')
  String get targetText;

  /// English translation of the target text
  @override
  String get english;

  /// Phonetic transcription in Devanagari script
  @override
  @JsonKey(name: 'phonetic_transcription')
  String get phoneticTranscription;

  /// Optional breakdown of radicals/characters (mainly for Japanese Kanji)
  @override
  @JsonKey(name: 'radical_breakdown')
  String? get radicalBreakdown;

  /// Create a copy of LessonModel
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$LessonModelImplCopyWith<_$LessonModelImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
