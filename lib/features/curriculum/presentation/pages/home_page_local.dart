import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../widgets/app_drawer.dart';
import '../../data/datasources/curriculum_data.dart';

class HomePageLocal extends ConsumerWidget {
  const HomePageLocal({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Get local data
    final curricula = CurriculumData.batch1Data;
    
    return Scaffold(
      backgroundColor: Colors.grey.shade50,
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.white,
        title: Row(
          children: [
            _buildColorfulLetter('C', Colors.red),
            _buildColorfulLetter('h', Colors.orange),
            _buildColorfulLetter('i', Colors.yellow.shade700),
            _buildColorfulLetter('r', Colors.green),
            _buildColorfulLetter('P', Colors.blue),
            _buildColorfulLetter('o', Colors.indigo),
            _buildColorfulLetter('l', Colors.purple),
            _buildColorfulLetter('l', Colors.pink),
            _buildColorfulLetter('y', Colors.red.shade300),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_outlined, color: Colors.grey),
            onPressed: () {
              // TODO: Show notifications
            },
          ),
          const SizedBox(width: 8),
        ],
      ),
      drawer: const AppDrawer(),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Welcome section
            Text(
              'Choose Your Language',
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: Colors.grey.shade800,
                  ),
            ),
            const SizedBox(height: 8),
            Text(
              'Start your language learning journey today!',
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey.shade600,
              ),
            ),
            const SizedBox(height: 32),

            // Language cards grid (using local data)
            GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
                childAspectRatio: 0.85,
              ),
              itemCount: curricula.length,
              itemBuilder: (context, index) {
                final curriculum = curricula[index];
                
                return _buildLanguageCard(
                  context,
                  languageId: curriculum.language.toLowerCase(),
                  flag: _getFlag(curriculum.language),
                  name: curriculum.language,
                  nativeScript: _getNativeScript(curriculum.language),
                  moduleCount: curriculum.modules.length,
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildColorfulLetter(String letter, Color color) {
    return Text(
      letter,
      style: TextStyle(
        fontSize: 24,
        fontWeight: FontWeight.bold,
        color: color,
      ),
    );
  }

  String _getFlag(String language) {
    switch (language.toLowerCase()) {
      case 'japanese':
        return '🇯🇵';
      case 'hindi':
        return '🇮🇳';
      case 'french':
        return '🇫🇷';
      default:
        return '🌍';
    }
  }

  String _getNativeScript(String language) {
    switch (language.toLowerCase()) {
      case 'japanese':
        return '日本語';
      case 'hindi':
        return 'हिन्दी';
      case 'french':
        return 'Français';
      default:
        return '';
    }
  }

  Widget _buildLanguageCard(
    BuildContext context, {
    required String languageId,
    required String flag,
    required String name,
    required String nativeScript,
    required int moduleCount,
  }) {
    return Card(
      elevation: 2,
      shadowColor: Colors.black.withOpacity(0.1),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(20),
        onTap: () {
          // TODO: Navigate to levels page
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('$name - $moduleCount modules available!')),
          );
        },
        child: Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20),
            gradient: LinearGradient(
              colors: [
                Colors.white,
                _getLanguageColor(name).withOpacity(0.05),
              ],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Flag emoji
              Text(
                flag,
                style: const TextStyle(fontSize: 56),
              ),
              const SizedBox(height: 12),
              
              // Language name
              Text(
                name,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.black87,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 4),
              
              // Native script
              Text(
                nativeScript,
                style: TextStyle(
                  fontSize: 16,
                  color: Colors.grey.shade600,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              
              // Module count
              Text(
                '$moduleCount modules',
                style: TextStyle(
                  fontSize: 12,
                  color: Colors.grey.shade500,
                ),
              ),
              const SizedBox(height: 12),
              
              // Start button
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                  color: _getLanguageColor(name),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: const Text(
                  'Start Learning',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Color _getLanguageColor(String language) {
    switch (language.toLowerCase()) {
      case 'japanese':
        return Colors.red.shade400;
      case 'hindi':
        return Colors.orange.shade400;
      case 'french':
        return Colors.blue.shade400;
      default:
        return Colors.deepPurple.shade400;
    }
  }
}
