import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:google_fonts/google_fonts.dart';
import 'firebase_options.dart';
import 'features/curriculum/presentation/pages/home_page.dart';
import 'features/curriculum/presentation/pages/firestore_test_page.dart';

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

class ChirpPollyApp extends StatelessWidget {
  const ChirpPollyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
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
      home: const HomePage(),
      routes: {
        '/test-firestore': (context) => const FirestoreTestPage(),
      },
    );
  }
}
