import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:google_fonts/google_fonts.dart';
import 'firebase_options.dart';
import 'features/curriculum/presentation/pages/home_page.dart';
import 'features/curriculum/presentation/pages/firestore_test_page.dart';
import 'features/auth/presentation/pages/login_page.dart';
import 'features/legal/presentation/pages/compliance_page.dart';
import 'features/info/presentation/pages/about_page.dart';
import 'features/auth/domain/entities/user_entity.dart';
import 'features/auth/presentation/providers/auth_providers.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize Firebase
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  
  runApp(
    const ProviderScope(
      child: ChirpPollyApp(),
    ),
  );
}

class ChirpPollyApp extends ConsumerWidget {
  const ChirpPollyApp({super.key});

  // Global navigator key for navigation outside of build context
  static final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Listen to auth state changes globally to update navigation or UI
    ref.listen(authStateProvider, (previous, next) {
      final user = next.valueOrNull;
      final previousUser = previous?.valueOrNull;
      
      debugPrint('Auth change detected: ${previousUser?.email} -> ${user?.email}');
      
      if (previousUser == null && user != null) {
        debugPrint('User just logged in. Current user: ${user.email}');
        // User just logged in, if they are on login page, move them to home
        final context = navigatorKey.currentContext;
        if (context != null) {
          final currentRoute = ModalRoute.of(context)?.settings.name;
          debugPrint('Current route: $currentRoute');
          if (currentRoute == '/login') {
            debugPrint('Redirecting from /login to /home via global listener');
            navigatorKey.currentState?.pushReplacementNamed('/home');
          }
        } else {
          debugPrint('Navigator context is null, cannot redirect globally');
        }
      }
    });

    return MaterialApp(
      navigatorKey: navigatorKey,
      title: 'ChirPolly - Language Learning',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.deepPurple,
        ),
        textTheme: GoogleFonts.notoSansTextTheme().apply(
          fontFamilyFallback: [
            'Noto Sans JP',
            'Noto Sans KR',
          ],
        ),
      ),
      // Changed from AuthGate to HomePage for public access
      home: const HomePage(),
      routes: {
        '/home': (context) => const HomePage(),
        '/test-firestore': (context) => const FirestoreTestPage(),
        '/login': (context) => const LoginPage(),
        '/compliance': (context) {
          final args = ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?;
          return CompliancePage(initialIndex: args?['initialIndex'] ?? 0);
        },
        '/about': (context) => const AboutPage(),
      },
    );
  }
}

