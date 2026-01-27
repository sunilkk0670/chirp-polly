import '../models/subscription_plan.dart';

class SubscriptionRepository {
  List<SubscriptionPlan> getPlans() {
    return [
      const SubscriptionPlan(
        id: 'free',
        name: 'Free (A1)',
        description: 'Perfect for beginners starting their journey.',
        monthlyPricing: {'USD': 0, 'EUR': 0, 'INR': 0},
        annualPricing: {'USD': 0, 'EUR': 0, 'INR': 0},
        features: [
          '1,000 Words Core Content',
          'N5 Japanese Intro',
          'Basic Liar Game',
        ],
        differentiator: 'Basic Liar Game',
        depth: 'N5 Intro',
        wordCount: 1000,
        isAdSupported: true,
        hasOfflineMode: false,
      ),
      const SubscriptionPlan(
        id: 'standard',
        name: 'Standard (A2)',
        description: 'Accelerate your learning with more depth.',
        monthlyPricing: {'USD': 12.99, 'EUR': 12.99, 'INR': 199},
        annualPricing: {'USD': 89.99, 'EUR': 89.99, 'INR': 999},
        features: [
          '2,000 Words Total Content',
          'N5 & N4 Kanji Mastery',
          'Full Grammar Suite',
          'Ad-Free Experience',
        ],
        differentiator: 'Full Grammar Suite',
        depth: 'N5 & N4 Kanji',
        wordCount: 2000,
        isAdSupported: false,
        hasOfflineMode: false,
        isMostPopular: true,
      ),
      const SubscriptionPlan(
        id: 'premium',
        name: 'Premium (B1)',
        description: 'Complete mastery for serious polyglots.',
        monthlyPricing: {'USD': 19.99, 'EUR': 19.99, 'INR': 299},
        annualPricing: {'USD': 134.99, 'EUR': 134.99, 'INR': 1499},
        features: [
          '3,000 Words Total Content',
          'N3 & N2 Fluency Mastery',
          'AI Speaking Trainer',
          'Ad-Free Experience',
          'Offline Mode Support',
        ],
        differentiator: 'AI Speaking Trainer',
        depth: 'N3 & N2 Mastery',
        wordCount: 3000,
        isAdSupported: false,
        hasOfflineMode: true,
      ),
    ];
  }
}
