import 'package:flutter/material.dart';
import '../../data/repositories/curriculum_repository.dart';

/// Test page to verify Firestore integration
class FirestoreTestPage extends StatefulWidget {
  const FirestoreTestPage({super.key});

  @override
  State<FirestoreTestPage> createState() => _FirestoreTestPageState();
}

class _FirestoreTestPageState extends State<FirestoreTestPage> {
  final _repository = CurriculumRepository();
  String _output = 'Tap a button to test Firestore...';
  bool _loading = false;

  Future<void> _testSpanishA2() async {
    setState(() {
      _loading = true;
      _output = 'Fetching Spanish A2 modules...';
    });

    try {
      final modules = await _repository.getModules('spanish', 'a2');
      
      final buffer = StringBuffer();
      buffer.writeln('✅ SUCCESS! Fetched ${modules.length} Spanish A2 modules:\n');
      
      for (var i = 0; i < modules.length; i++) {
        final module = modules[i];
        buffer.writeln('${i + 1}. ${module.theme}');
        buffer.writeln('   ID: ${module.id}');
        buffer.writeln('   Lessons: ${module.lessons.length}');
        buffer.writeln('   Liar Game: ${module.liarGameData.trap}\n');
      }

      // Test cache
      buffer.writeln('\n📊 Cache Stats:');
      final stats = _repository.getCacheStats();
      buffer.writeln('Total Cached: ${stats['totalCached']}');
      buffer.writeln('Keys: ${stats['keys']}');
      buffer.writeln('Total Modules: ${stats['totalModules']}');

      setState(() {
        _output = buffer.toString();
        _loading = false;
      });
    } catch (e, stackTrace) {
      setState(() {
        _output = '❌ ERROR:\n$e\n\nStack Trace:\n$stackTrace';
        _loading = false;
      });
    }
  }

  Future<void> _testJapaneseA2() async {
    setState(() {
      _loading = true;
      _output = 'Fetching Japanese A2 modules...';
    });

    try {
      final modules = await _repository.getModules('japanese', 'a2');
      
      setState(() {
        _output = '✅ SUCCESS! Fetched ${modules.length} Japanese A2 modules:\n\n' +
            modules.map((m) => '• ${m.theme} (${m.lessons.length} lessons)').join('\n');
        _loading = false;
      });
    } catch (e) {
      setState(() {
        _output = '❌ ERROR: $e';
        _loading = false;
      });
    }
  }

  Future<void> _testKoreanA2() async {
    setState(() {
      _loading = true;
      _output = 'Fetching Korean A2 modules...';
    });

    try {
      final modules = await _repository.getModules('korean', 'a2');
      
      setState(() {
        _output = '✅ SUCCESS! Fetched ${modules.length} Korean A2 modules:\n\n' +
            modules.map((m) => '• ${m.theme} (${m.lessons.length} lessons)').join('\n');
        _loading = false;
      });
    } catch (e) {
      setState(() {
        _output = '❌ ERROR: $e';
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Firestore Integration Test'),
        backgroundColor: Colors.deepPurple,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              'Test Firestore Fetching',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            
            ElevatedButton.icon(
              onPressed: _loading ? null : _testSpanishA2,
              icon: const Icon(Icons.flag),
              label: const Text('Test Spanish A2 (10 modules)'),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.all(16),
                backgroundColor: Colors.red,
                foregroundColor: Colors.white,
              ),
            ),
            const SizedBox(height: 12),
            
            ElevatedButton.icon(
              onPressed: _loading ? null : _testJapaneseA2,
              icon: const Icon(Icons.flag),
              label: const Text('Test Japanese A2 (10 modules)'),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.all(16),
                backgroundColor: Colors.pink,
                foregroundColor: Colors.white,
              ),
            ),
            const SizedBox(height: 12),
            
            ElevatedButton.icon(
              onPressed: _loading ? null : _testKoreanA2,
              icon: const Icon(Icons.flag),
              label: const Text('Test Korean A2 (15 modules)'),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.all(16),
                backgroundColor: Colors.blue,
                foregroundColor: Colors.white,
              ),
            ),
            const SizedBox(height: 20),
            
            Expanded(
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.grey.shade100,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.grey.shade300),
                ),
                child: SingleChildScrollView(
                  child: _loading
                      ? const Center(child: CircularProgressIndicator())
                      : Text(
                          _output,
                          style: const TextStyle(
                            fontFamily: 'monospace',
                            fontSize: 12,
                          ),
                        ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
