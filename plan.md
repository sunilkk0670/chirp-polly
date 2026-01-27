# Implementation Plan - Pricing Page and Subscription Integration

I will implement a comprehensive pricing page for ChirpPolly, featuring a monthly/annual toggle and localized pricing for US, Euro, and India markets.

## Proposed Changes

### 1. Data Layer
- **Model**: Create `SubscriptionPlan` model to store pricing details, features, and tiers.
- **Repository**: Create `SubscriptionRepository` to handle localized pricing logic.

### 2. Presentation Layer
- **Page**: Create `PricingPage` in `lib/features/subscription/presentation/pages/pricing_page.dart`.
  - **Switch**: A beautiful toggle for Monthly vs. Annual plans.
  - **Cards**: Three Tier Cards (Free, Standard, Premium) with "Rich Aesthetics" as per requirements.
  - **Comparison Table**: A detailed feature comparison table for desktop users.
  - **Responsive**: Optimized for both Mobile and Web/Desktop.
- **Provider**: Create `subscription_provider.dart` to manage the selected billing cycle and currency.

### 3. Navigation
- **AppBar**: Add "Pricing" button to `HomePage`'s `AppBar`.
- **Drawer**: Add "Pricing" item to `AppDrawer`.
- **Routing**: Register `/pricing` route in `main.dart`.

## Pricing Details (Annual Discount 35-45%)

| Feature | Free (A1) | Standard (A2) | Premium (B1) |
| :--- | :--- | :--- | :--- |
| **US Monthly** | $0 | $12.99 | $19.99 |
| **US Annual** | $0 | $89.99 (42% Off) | $134.99 (44% Off) |
| **Euro Monthly** | €0 | €12.99 | €19.99 |
| **Euro Annual** | €0 | €89.99 | €134.99 |
| **India Monthly** | Free | ₹199 | ₹299 |
| **India Annual** | Free | ₹999 (58% Off) | ₹1,499 (58% Off) |

## Tiers & Differentiators
- **Free (A1)**: 1,000 Words, N5 Intro, Ad-supported, Basic Liar Game, Online Only.
- **Standard (A2)**: 2,000 Words, N5 & N4 Kanji, Ad-Free, Full Grammar Suite, Online Only.
- **Premium (B1)**: 3,000 Words, N3 & N2 Mastery, Ad-Free, AI Speaking Trainer, Offline Mode.

## UI/UX Design Goals
- **Gradients**: Use vibrant gradients (Deep Purple to Coral).
- **Glassmorphism**: Subtle glass effects on plan cards.
- **Animations**: Smooth transitions when switching between Monthly and Annual modes.
- **Material 3**: Full adherence to M3 design principles.

## Verification Plan
1.  Verify the "Pricing" button appears in the AppBar.
2.  Navigate to the Pricing page and check the Monthly/Annual toggle.
3.  Ensure pricing updates correctly based on the toggle.
4.  Check responsiveness on different screen widths.
