import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:chirp_polly/main.dart';

void main() {
  testWidgets('Curriculum app smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const ChirpPollyApp());

    // Verify that the app title is present
    expect(find.text('Chirp Polly - Curriculum'), findsOneWidget);
    
    // Verify that at least one language is available
    expect(find.byType(DropdownButton<String>), findsOneWidget);
  });
}
