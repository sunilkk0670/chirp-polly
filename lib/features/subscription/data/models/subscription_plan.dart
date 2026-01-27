import 'package:freezed_annotation/freezed_annotation.dart';

part 'subscription_plan.freezed.dart';
part 'subscription_plan.g.dart';

@freezed
class SubscriptionPlan with _$SubscriptionPlan {
  const factory SubscriptionPlan({
    required String id,
    required String name,
    required String description,
    required Map<String, double> monthlyPricing, // Localized pricing: {'USD': 12.99, 'EUR': 12.99, 'INR': 199}
    required Map<String, double> annualPricing,  // Localized pricing: {'USD': 89.99, 'EUR': 89.99, 'INR': 999}
    required List<String> features,
    required String differentiator,
    required String depth,
    required int wordCount,
    required bool isAdSupported,
    required bool hasOfflineMode,
    @Default(false) bool isMostPopular,
  }) = _SubscriptionPlan;

  factory SubscriptionPlan.fromJson(Map<String, dynamic> json) =>
      _$SubscriptionPlanFromJson(json);
}
