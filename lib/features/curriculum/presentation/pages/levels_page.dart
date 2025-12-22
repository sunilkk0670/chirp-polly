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
                    levelName,
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

  Color _getLevelColor(String level) {
    switch (level.toLowerCase()) {
      case 'a1':
        return Colors.green.shade400;
      case 'a2':
        return Colors.blue.shade400;
      case 'b1':
        return Colors.orange.shade400;
      default:
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

          return ListView.builder(
            padding: const EdgeInsets.all(20),
            itemCount: modules.length,
            itemBuilder: (context, index) {
              final moduleDoc = modules[index];
              final moduleData = moduleDoc.data() as Map<String, dynamic>;

              return _buildModuleCard(context, moduleData);
            },
          );
        },
      ),
    );
  }

  Widget _buildModuleCard(BuildContext context, Map<String, dynamic> moduleData) {
    final lessons = (moduleData['lessons'] as List<dynamic>?) ?? [];
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
                      '${lessons.length} words to learn',
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
}
