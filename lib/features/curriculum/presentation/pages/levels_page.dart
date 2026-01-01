import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../widgets/chirpolly_logo.dart';
import 'lesson_content_page.dart';

class LevelsPage extends StatelessWidget {
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
  Widget build(BuildContext context) {
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
      body: StreamBuilder<QuerySnapshot>(
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
                levelId: levelId,
                levelName: levelData['name'] ?? 'Unknown',
                description: levelData['description'] ?? '',
              );
            },
          );
        },
      ),
    );
  }

  Widget _buildLevelCard(
    BuildContext context, {
    required String levelId,
    required String levelName,
    required String description,
  }) {
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
              builder: (context) => ModulesPage(
                languageId: languageId,
                languageName: languageName,
                levelId: levelId,
                levelName: levelName,
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
                    Text(
                      levelName,
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
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
              Icon(Icons.arrow_forward_ios, color: Colors.grey.shade400, size: 20),
            ],
          ),
        ),
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

    // Check for direct lessons array (may have nested vocabularyItems)
    if (moduleData['lessons'] != null && moduleData['lessons'] is List) {
      final lessons = moduleData['lessons'] as List;
      for (var lesson in lessons) {
        if (lesson is Map) {
          // Check if this lesson has nested vocabularyItems
          if (lesson['vocabularyItems'] != null && lesson['vocabularyItems'] is List) {
            final vocabItems = lesson['vocabularyItems'] as List;
            count += vocabItems.length;
          } else {
            // Flat structure - the lesson itself is a vocabulary item
            count++;
          }
        }
      }
    }

    // Check for direct vocabularyItems array (new format)
    if (count == 0 && moduleData['vocabularyItems'] != null && moduleData['vocabularyItems'] is List) {
      final vocabItems = moduleData['vocabularyItems'] as List;
      count = vocabItems.length;
    }

    return count;
  }
}
