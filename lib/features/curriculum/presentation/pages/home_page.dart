import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../widgets/app_drawer.dart';
import '../widgets/chirpolly_logo.dart';
import 'levels_page.dart';

class HomePage extends ConsumerWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 2,
        backgroundColor: Colors.white,
        toolbarHeight: 80,
        title: const ChirPollyLogo(fontSize: 28),
        actions: [
          TextButton(
            onPressed: () {},
            child: Text(
              'Languages',
              style: TextStyle(color: Colors.deepPurple.shade700, fontSize: 16, fontWeight: FontWeight.w600),
            ),
          ),
          TextButton(
            onPressed: () {},
            child: Text(
              'About',
              style: TextStyle(color: Colors.deepPurple.shade700, fontSize: 16, fontWeight: FontWeight.w600),
            ),
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: StreamBuilder<QuerySnapshot>(
        stream: FirebaseFirestore.instance
            .collection('languages')
            .where('enabled', isEqualTo: true)
            .snapshots(),
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.error_outline, size: 64, color: Colors.red.shade300),
                  const SizedBox(height: 16),
                  Text('Error loading languages', style: TextStyle(color: Colors.grey.shade700)),
                ],
              ),
            );
          }

          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(
              child: CircularProgressIndicator(color: Theme.of(context).colorScheme.primary),
            );
          }

          final languages = snapshot.data?.docs ?? [];

          if (languages.isEmpty) {
            return Center(
              child: Text('No languages available yet', style: TextStyle(color: Colors.grey.shade600)),
            );
          }

          return SingleChildScrollView(
            child: Column(
              children: [
                // Hero Section
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(vertical: 60, horizontal: 40),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [
                        Colors.deepPurple.shade50,
                        Colors.blue.shade50,
                      ],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                  ),
                  child: Column(
                    children: [
                      ShaderMask(
                        shaderCallback: (bounds) => LinearGradient(
                          colors: [
                            Colors.blue.shade700,
                            Colors.teal.shade500,
                          ],
                        ).createShader(bounds),
                        child: Text(
                          'Don\'t Just Learn. Start Chirping.',
                          style: TextStyle(
                            fontSize: 48,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                            height: 1.2,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        'Master 21 languages through play and conversation.',
                        style: TextStyle(
                          fontSize: 20,
                          color: Colors.grey.shade700,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),

                // Languages Grid Section
                Container(
                  constraints: const BoxConstraints(maxWidth: 1200),
                  padding: const EdgeInsets.all(40),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Choose Your Language',
                        style: TextStyle(
                          fontSize: 32,
                          fontWeight: FontWeight.bold,
                          color: Colors.grey.shade900,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Start your language learning journey today',
                        style: TextStyle(
                          fontSize: 16,
                          color: Colors.grey.shade600,
                        ),
                      ),
                      const SizedBox(height: 32),

                      // 3-column grid
                      GridView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 3,
                          crossAxisSpacing: 20,
                          mainAxisSpacing: 20,
                          childAspectRatio: 1.4,
                        ),
                        itemCount: languages.length,
                        itemBuilder: (context, index) {
                          final languageDoc = languages[index];
                          final languageData = languageDoc.data() as Map<String, dynamic>;
                          
                          return _buildLanguageCard(
                            context,
                            languageId: languageDoc.id,
                            flag: languageData['flag'] ?? '🌍',
                            name: languageData['name'] ?? 'Unknown',
                            nativeScript: languageData['nativeScript'] ?? '',
                          );
                        },
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildLanguageCard(
    BuildContext context, {
    required String languageId,
    required String flag,
    required String name,
    required String nativeScript,
  }) {
    return Card(
      elevation: 0,
      shadowColor: Colors.black.withOpacity(0.08),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(color: Colors.grey.shade200, width: 1),
      ),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          color: _getLanguageBackgroundColor(name),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.04),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: InkWell(
          borderRadius: BorderRadius.circular(16),
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => LevelsPage(
                  languageId: languageId,
                  languageName: name,
                  flag: flag,
                ),
              ),
            );
          },
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Flag emoji
                Text(
                  flag,
                  style: const TextStyle(fontSize: 48),
                ),
                const SizedBox(height: 12),
                
                // Language name
                Text(
                  name,
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.grey.shade900,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 4),
                
                // Native script
                Text(
                  nativeScript,
                  style: TextStyle(
                    fontSize: 14,
                    color: Colors.grey.shade600,
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Color _getLanguageBackgroundColor(String language) {
    // Subtle, soft background colors
    switch (language.toLowerCase()) {
      case 'japanese':
        return Colors.red.shade50;
      case 'hindi':
        return Colors.orange.shade50;
      case 'french':
        return Colors.blue.shade50;
      case 'korean':
        return Colors.purple.shade50;
      case 'chinese':
        return Colors.green.shade50;
      default:
        return Colors.grey.shade50;
    }
  }
}
