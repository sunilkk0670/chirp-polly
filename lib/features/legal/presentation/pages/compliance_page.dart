import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_markdown/flutter_markdown.dart';

class CompliancePage extends StatelessWidget {
  final int initialIndex;

  const CompliancePage({
    super.key,
    this.initialIndex = 0,
  });

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      initialIndex: initialIndex,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Legal Compliance'),
          bottom: const TabBar(
            tabs: [
              Tab(text: 'Privacy Policy'),
              Tab(text: 'Terms of Service'),
            ],
            indicatorColor: Color(0xFF6A4CBC),
            labelColor: Color(0xFF6A4CBC),
            unselectedLabelColor: Colors.grey,
          ),
        ),
        body: const TabBarView(
          children: [
            MarkdownViewer(assetPath: 'assets/legal/privacy_policy.md'),
            MarkdownViewer(assetPath: 'assets/legal/terms_of_service.md'),
          ],
        ),
      ),
    );
  }
}

class MarkdownViewer extends StatelessWidget {
  final String assetPath;

  const MarkdownViewer({
    super.key,
    required this.assetPath,
  });

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<String>(
      future: rootBundle.loadString(assetPath),
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return Center(
            child: Text('Error loading document: ${snapshot.error}'),
          );
        }

        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(
            child: CircularProgressIndicator(color: Color(0xFF6A4CBC)),
          );
        }

        return Markdown(
          data: snapshot.data ?? '',
          selectable: true,
          styleSheet: MarkdownStyleSheet(
            h1: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Color(0xFF2E3192),
            ),
            h2: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Color(0xFF2E3192),
            ),
            p: const TextStyle(
              fontSize: 16,
              height: 1.5,
              color: Color(0xFF424242),
            ),
            blockquote: const TextStyle(
              color: Color(0xFF6A4CBC),
            ),
            blockquoteDecoration: BoxDecoration(
              color: Colors.purple.shade50,
              borderRadius: BorderRadius.circular(8),
              border: const Border(
                left: BorderSide(color: Color(0xFF6A4CBC), width: 4),
              ),
            ),
          ),
        );
      },
    );
  }
}
