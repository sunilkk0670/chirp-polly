// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'liar_game_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

LiarGameModel _$LiarGameModelFromJson(Map<String, dynamic> json) {
  return _LiarGameModel.fromJson(json);
}

/// @nodoc
mixin _$LiarGameModel {
  /// The common mistake or trap that learners often fall into
  String get trap => throw _privateConstructorUsedError;

  /// The correct version or proper usage
  @JsonKey(name: 'correct_version')
  String get correctVersion => throw _privateConstructorUsedError;

  /// Detailed explanation of why the trap is wrong and cultural/linguistic context
  String get explanation => throw _privateConstructorUsedError;

  /// Serializes this LiarGameModel to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of LiarGameModel
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $LiarGameModelCopyWith<LiarGameModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $LiarGameModelCopyWith<$Res> {
  factory $LiarGameModelCopyWith(
          LiarGameModel value, $Res Function(LiarGameModel) then) =
      _$LiarGameModelCopyWithImpl<$Res, LiarGameModel>;
  @useResult
  $Res call(
      {String trap,
      @JsonKey(name: 'correct_version') String correctVersion,
      String explanation});
}

/// @nodoc
class _$LiarGameModelCopyWithImpl<$Res, $Val extends LiarGameModel>
    implements $LiarGameModelCopyWith<$Res> {
  _$LiarGameModelCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of LiarGameModel
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? trap = null,
    Object? correctVersion = null,
    Object? explanation = null,
  }) {
    return _then(_value.copyWith(
      trap: null == trap
          ? _value.trap
          : trap // ignore: cast_nullable_to_non_nullable
              as String,
      correctVersion: null == correctVersion
          ? _value.correctVersion
          : correctVersion // ignore: cast_nullable_to_non_nullable
              as String,
      explanation: null == explanation
          ? _value.explanation
          : explanation // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$LiarGameModelImplCopyWith<$Res>
    implements $LiarGameModelCopyWith<$Res> {
  factory _$$LiarGameModelImplCopyWith(
          _$LiarGameModelImpl value, $Res Function(_$LiarGameModelImpl) then) =
      __$$LiarGameModelImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String trap,
      @JsonKey(name: 'correct_version') String correctVersion,
      String explanation});
}

/// @nodoc
class __$$LiarGameModelImplCopyWithImpl<$Res>
    extends _$LiarGameModelCopyWithImpl<$Res, _$LiarGameModelImpl>
    implements _$$LiarGameModelImplCopyWith<$Res> {
  __$$LiarGameModelImplCopyWithImpl(
      _$LiarGameModelImpl _value, $Res Function(_$LiarGameModelImpl) _then)
      : super(_value, _then);

  /// Create a copy of LiarGameModel
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? trap = null,
    Object? correctVersion = null,
    Object? explanation = null,
  }) {
    return _then(_$LiarGameModelImpl(
      trap: null == trap
          ? _value.trap
          : trap // ignore: cast_nullable_to_non_nullable
              as String,
      correctVersion: null == correctVersion
          ? _value.correctVersion
          : correctVersion // ignore: cast_nullable_to_non_nullable
              as String,
      explanation: null == explanation
          ? _value.explanation
          : explanation // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$LiarGameModelImpl implements _LiarGameModel {
  const _$LiarGameModelImpl(
      {required this.trap,
      @JsonKey(name: 'correct_version') required this.correctVersion,
      required this.explanation});

  factory _$LiarGameModelImpl.fromJson(Map<String, dynamic> json) =>
      _$$LiarGameModelImplFromJson(json);

  /// The common mistake or trap that learners often fall into
  @override
  final String trap;

  /// The correct version or proper usage
  @override
  @JsonKey(name: 'correct_version')
  final String correctVersion;

  /// Detailed explanation of why the trap is wrong and cultural/linguistic context
  @override
  final String explanation;

  @override
  String toString() {
    return 'LiarGameModel(trap: $trap, correctVersion: $correctVersion, explanation: $explanation)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$LiarGameModelImpl &&
            (identical(other.trap, trap) || other.trap == trap) &&
            (identical(other.correctVersion, correctVersion) ||
                other.correctVersion == correctVersion) &&
            (identical(other.explanation, explanation) ||
                other.explanation == explanation));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode =>
      Object.hash(runtimeType, trap, correctVersion, explanation);

  /// Create a copy of LiarGameModel
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$LiarGameModelImplCopyWith<_$LiarGameModelImpl> get copyWith =>
      __$$LiarGameModelImplCopyWithImpl<_$LiarGameModelImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$LiarGameModelImplToJson(
      this,
    );
  }
}

abstract class _LiarGameModel implements LiarGameModel {
  const factory _LiarGameModel(
      {required final String trap,
      @JsonKey(name: 'correct_version') required final String correctVersion,
      required final String explanation}) = _$LiarGameModelImpl;

  factory _LiarGameModel.fromJson(Map<String, dynamic> json) =
      _$LiarGameModelImpl.fromJson;

  /// The common mistake or trap that learners often fall into
  @override
  String get trap;

  /// The correct version or proper usage
  @override
  @JsonKey(name: 'correct_version')
  String get correctVersion;

  /// Detailed explanation of why the trap is wrong and cultural/linguistic context
  @override
  String get explanation;

  /// Create a copy of LiarGameModel
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$LiarGameModelImplCopyWith<_$LiarGameModelImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
