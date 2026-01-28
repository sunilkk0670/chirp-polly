import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../../../auth/presentation/providers/auth_providers.dart';
import '../widgets/chirpolly_logo.dart';
import 'lesson_content_page.dart';

class LevelsPage extends ConsumerWidget {
  final String languageId;
  final String languageName;
  final String flag;

  const LevelsPage({
    super.key,
    required this.languageId,
    required this.languageName,
    required this.flag,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final currentUser = ref.watch(currentUserProvider);
    final isGuest = currentUser == null;

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.white,
        forceMaterialTransparency: false,
        toolbarHeight: 80,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: MouseRegion(
          cursor: SystemMouseCursors.click,
          child: GestureDetector(
            onTap: () {
              Navigator.of(context).popUntil((route) => route.isFirst);
            },
            child: const ChirPollyLogo(fontSize: 24),
          ),
        ),
      ),
      body: Column(
        children: [
          if (isGuest) _buildGuestNudge(context),
          Expanded(
            child: StreamBuilder<QuerySnapshot>(
              stream: FirebaseFirestore.instance
                  .collection('languages')
                  .doc(languageId)
                  .collection('levels')
                  .snapshots(),
              builder: (context, levelsSnapshot) {
                if (levelsSnapshot.hasError) {
                  return Center(child: Text('Error: ${levelsSnapshot.error}'));
                }

                if (levelsSnapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                }

                final levels = levelsSnapshot.data?.docs ?? [];

                if (levels.isEmpty) {
                  return const Center(child: Text('No levels available'));
                }

                return ListView.builder(
                  padding: const EdgeInsets.all(20),
                  itemCount: levels.length,
                  itemBuilder: (context, index) {
                    final levelDoc = levels[index];
                    final levelData = levelDoc.data() as Map<String, dynamic>;
                    final levelId = levelDoc.id;

                    return _buildLevelCard(
                      context,
                      ref,
                      isGuest: isGuest,
                      levelId: levelId,
                      levelName: levelData['name'] ?? 'Unknown',
                      description: levelData['description'] ?? '',
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGuestNudge(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      decoration: BoxDecoration(
        color: const Color(0xFF6A4CBC).withOpacity(0.1),
        border: const Border(
          bottom: BorderSide(color: Color(0xFF6A4CBC), width: 0.5),
        ),
      ),
      child: Row(
        children: [
          const Icon(Icons.stars_rounded, color: Color(0xFF6A4CBC)),
          const SizedBox(width: 12),
          const Expanded(
            child: Text(
              'Sign up for free to track your progress and unlock advanced levels!',
              style: TextStyle(
                color: Color(0xFF6A4CBC),
                fontWeight: FontWeight.w600,
                fontSize: 14,
              ),
            ),
          ),
          TextButton(
            onPressed: () => Navigator.pushNamed(context, '/login'),
            child: const Text(
              'Sign Up',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                decoration: TextDecoration.underline,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLevelCard(
    BuildContext context,
    WidgetRef ref, {
    required bool isGuest,
    required String levelId,
    required String levelName,
    required String description,
  }) {
    final isGated = isGuest && (levelId.toLowerCase() != 'a1');

    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: InkWell(
        borderRadius: BorderRadius.circular(16),
        onTap: () {
          if (isGated) {
            _showGatedContentDialog(context);
          } else {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => ModulesPage(
                  languageId: languageId,
                  languageName: languageName,
                  levelId: levelId,
                  levelName: levelName,
                  flag: flag,
                ),
              ),
            );
          }
        },
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Row(
            children: [
              Container(
                width: 60,
                height: 60,
                decoration: BoxDecoration(
                  color: _getLevelColor(levelName),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Center(
                  child: Text(
                    _getLevelCode(levelName),
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(
                          levelName,
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        if (isGated) ...[
                          const SizedBox(width: 8),
                          Icon(Icons.lock_outline, size: 16, color: Colors.amber.shade700),
                        ],
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      description,
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.grey.shade600,
                      ),
                    ),
                  ],
                ),
              ),
              Icon(
                isGated ? Icons.lock_outline : Icons.arrow_forward_ios,
                color: Colors.grey.shade400,
                size: 20,
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showGatedContentDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: Row(
          children: [
            Icon(Icons.lock_person_rounded, color: Colors.amber.shade700),
            const SizedBox(width: 12),
            const Text('Unlock Premium Content'),
          ],
        ),
        content: const Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Advanced levels (A2 & B1) are exclusively available to our registered community.',
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
            SizedBox(height: 16),
            Text('• 1,000+ new vocabulary words\n• Advanced Liar Game traps\n• Cultural mastery modules'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Maybe Later', style: TextStyle(color: Colors.grey.shade600)),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pushNamed(context, '/login');
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF6A4CBC),
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
            child: const Text('Sign Up / Login'),
          ),
        ],
      ),
    );
  }

  String _getLevelCode(String levelName) {
    final levelLower = levelName.toLowerCase();
    if (levelLower.contains('a1')) {
      return 'A1';
    } else if (levelLower.contains('a2')) {
      return 'A2';
    } else if (levelLower.contains('b1')) {
      return 'B1';
    } else {
      return levelName.substring(0, 2).toUpperCase();
    }
  }

  Color _getLevelColor(String level) {
    final levelLower = level.toLowerCase();
    if (levelLower.contains('a1')) {
      return Colors.green.shade400;
    } else if (levelLower.contains('a2')) {
      return Colors.blue.shade400;
    } else if (levelLower.contains('b1')) {
      return Colors.orange.shade400;
    } else {
      return Colors.purple.shade400;
    }
  }
}

class ModulesPage extends StatelessWidget {
  final String languageId;
  final String languageName;
  final String levelId;
  final String levelName;
  final String flag;

  const ModulesPage({
    super.key,
    required this.languageId,
    required this.languageName,
    required this.levelId,
    required this.levelName,
    required this.flag,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade50,
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.transparent,
        forceMaterialTransparency: true,
        toolbarHeight: 80,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: MouseRegion(
          cursor: SystemMouseCursors.click,
          child: GestureDetector(
            onTap: () {
              Navigator.of(context).popUntil((route) => route.isFirst);
            },
            child: const ChirPollyLogo(fontSize: 24),
          ),
        ),
      ),
      body: StreamBuilder<QuerySnapshot>(
        stream: FirebaseFirestore.instance
            .collection('languages')
            .doc(languageId)
            .collection('levels')
            .doc(levelId)
            .collection('modules')
            .orderBy('order')
            .snapshots(),
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          }

          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          final modules = snapshot.data?.docs ?? [];
          
          if (modules.isEmpty) {
            return const Center(child: Text('No modules available'));
          }

          // Calculate total words in level
          int totalWords = 0;
          for (var mod in modules) {
            final data = mod.data() as Map<String, dynamic>;
            totalWords += _countVocabularyItems(data);
          }

          return Column(
            children: [
              // Level Summary Header
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                color: Colors.white,
                child: Row(
                  children: [
                    Icon(Icons.auto_awesome, color: Colors.amber.shade700),
                    const SizedBox(width: 8),
                    Text(
                      'Level Total: $totalWords words',
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
              Expanded(
                child: ListView.builder(
                  padding: const EdgeInsets.all(20),
                  itemCount: modules.length,
                  itemBuilder: (context, index) {
                    final moduleDoc = modules[index];
                    final moduleData = moduleDoc.data() as Map<String, dynamic>;

                    return _buildModuleCard(context, moduleData);
                  },
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildModuleCard(BuildContext context, Map<String, dynamic> moduleData) {
    final wordCount = _countVocabularyItems(moduleData);
    final liarGameData = moduleData['liarGameData'] as Map<String, dynamic>?;

    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: InkWell(
        borderRadius: BorderRadius.circular(16),
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => LessonContentPage(
                languageId: languageId,
                languageName: languageName,
                levelId: levelId,
                moduleTheme: moduleData['theme'] ?? 'Unknown Theme',
                moduleData: moduleData,
                flag: flag,
              ),
            ),
          );
        },
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Row(
            children: [
              Container(
                width: 60,
                height: 60,
                decoration: BoxDecoration(
                  color: Colors.deepPurple.shade100,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(
                  Icons.book,
                  color: Colors.deepPurple.shade700,
                  size: 32,
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      moduleData['theme'] ?? 'Unknown Theme',
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 18,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '$wordCount words to learn',
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.grey.shade600,
                      ),
                    ),
                  ],
                ),
              ),
              Icon(Icons.arrow_forward_ios, color: Colors.grey.shade400, size: 20),
            ],
          ),
        ),
      ),
    );
  }

  /// Counts vocabulary items in a module, handling both flat and nested structures
  /// Matches the logic from lesson_content_page.dart's _extractVocabularyItems
  int _countVocabularyItems(Map<String, dynamic> moduleData) {
    // Priority 1: Use explicit count field if available (optimization)
    if (moduleData['count'] != null) {
      return moduleData['count'] as int;
    }

    int count = 0;

    // Check for direct lessons array
    if (moduleData['lessons'] != null && moduleData['lessons'] is List) {
      final lessons = moduleData['lessons'] as List;
      for (var lesson in lessons) {
        if (lesson is Map) {
          // Check for nested vocabulary (modern schema)
          if (lesson['vocabulary'] != null && lesson['vocabulary'] is List) {
            count += (lesson['vocabulary'] as List).length;
          } 
          // Check for nested vocabularyItems (legacy schema)
          else if (lesson['vocabularyItems'] != null && lesson['vocabularyItems'] is List) {
            count += (lesson['vocabularyItems'] as List).length;
          } 
          else {
            // Flat structure - the lesson themselves are vocabulary items
            count++;
          }
        }
      }
    }

    // Check for direct vocabularyItems array at module level
    if (count == 0 && moduleData['vocabularyItems'] != null && moduleData['vocabularyItems'] is List) {
      final vocabItems = moduleData['vocabularyItems'] as List;
      count = vocabItems.length;
    }

    return count;
  }
}
