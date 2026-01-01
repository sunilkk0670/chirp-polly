import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../widgets/chirpolly_logo.dart';
import 'levels_page.dart';

class HomePage extends ConsumerStatefulWidget {
  const HomePage({super.key});

  @override
  ConsumerState<HomePage> createState() => _HomePageState();
}

class _HomePageState extends ConsumerState<HomePage> {
  final ScrollController _scrollController = ScrollController();
  final GlobalKey _languagesKey = GlobalKey();
  final GlobalKey _aboutKey = GlobalKey();

  void _scrollToSection(GlobalKey key) {
    final context = key.currentContext;
    if (context != null) {
      Scrollable.ensureVisible(
        context,
        duration: const Duration(milliseconds: 600),
        curve: Curves.easeInOutCubic,
      );
    }
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Focus(
      autofocus: true,
      onKeyEvent: (node, event) {
        if (event is KeyDownEvent) {
          const scrollAmount = 100.0;
          const pageScrollAmount = 500.0;
          
          if (event.logicalKey == LogicalKeyboardKey.arrowDown) {
            _scrollController.animateTo(
              _scrollController.offset + scrollAmount,
              duration: const Duration(milliseconds: 200),
              curve: Curves.easeOut,
            );
            return KeyEventResult.handled;
          } else if (event.logicalKey == LogicalKeyboardKey.arrowUp) {
            _scrollController.animateTo(
              _scrollController.offset - scrollAmount,
              duration: const Duration(milliseconds: 200),
              curve: Curves.easeOut,
            );
            return KeyEventResult.handled;
          } else if (event.logicalKey == LogicalKeyboardKey.pageDown) {
            _scrollController.animateTo(
              _scrollController.offset + pageScrollAmount,
              duration: const Duration(milliseconds: 300),
              curve: Curves.easeOut,
            );
            return KeyEventResult.handled;
          } else if (event.logicalKey == LogicalKeyboardKey.pageUp) {
            _scrollController.animateTo(
              _scrollController.offset - pageScrollAmount,
              duration: const Duration(milliseconds: 300),
              curve: Curves.easeOut,
            );
            return KeyEventResult.handled;
          } else if (event.logicalKey == LogicalKeyboardKey.home) {
            _scrollController.animateTo(
              0,
              duration: const Duration(milliseconds: 500),
              curve: Curves.easeOut,
            );
            return KeyEventResult.handled;
          } else if (event.logicalKey == LogicalKeyboardKey.end) {
            _scrollController.animateTo(
              _scrollController.position.maxScrollExtent,
              duration: const Duration(milliseconds: 500),
              curve: Curves.easeOut,
            );
            return KeyEventResult.handled;
          }
        }
        return KeyEventResult.ignored;
      },
      child: Scaffold(
        backgroundColor: Colors.white,
        appBar: AppBar(
          elevation: 0,
          backgroundColor: Colors.white,
          surfaceTintColor: Colors.white,
          toolbarHeight: 80,
          title: const Padding(
            padding: EdgeInsets.only(left: 16.0),
            child: ChirPollyLogo(fontSize: 28),
          ),
          actions: [
            TextButton(
              onPressed: () => _scrollToSection(_languagesKey),
              child: Text(
                'Languages',
                style: TextStyle(
                  color: Colors.grey.shade800,
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            const SizedBox(width: 16),
            TextButton(
              onPressed: () => _scrollToSection(_aboutKey),
              child: Text(
                'About',
                style: TextStyle(
                  color: Colors.grey.shade800,
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            const SizedBox(width: 32),
          ],
        ),
        body: StreamBuilder<QuerySnapshot>(
          stream: FirebaseFirestore.instance
              .collection('languages')
              .where('enabled', isEqualTo: true)
              .snapshots(),
          builder: (context, snapshot) {
            if (snapshot.hasError) {
              return _buildErrorState();
            }

            if (snapshot.connectionState == ConnectionState.waiting) {
              return _buildLoadingState();
            }

            final languages = snapshot.data?.docs ?? [];

            return SingleChildScrollView(
              controller: _scrollController,
              child: Column(
                children: [
                  _buildHeroSection(),
                  _buildLanguagesSection(languages),
                  _buildAboutSection(),
                  _buildFooter(),
                ],
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildErrorState() {
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

  Widget _buildLoadingState() {
    return Center(
      child: CircularProgressIndicator(color: Colors.blue.shade600),
    );
  }

  Widget _buildHeroSection() {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            const Color(0xFF667EEA), // Vibrant purple-blue
            const Color(0xFF764BA2), // Deep purple
            const Color(0xFFF093FB), // Pink
            const Color(0xFF4FACFE), // Bright blue
          ],
          stops: const [0.0, 0.3, 0.7, 1.0],
        ),
      ),
      child: Stack(
        children: [
          // Animated Background Circles
          Positioned(
            top: -100,
            right: -100,
            child: Container(
              width: 400,
              height: 400,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: RadialGradient(
                  colors: [
                    Colors.white.withOpacity(0.2),
                    Colors.transparent,
                  ],
                ),
              ),
            ),
          ),
          Positioned(
            bottom: -80,
            left: -80,
            child: Container(
              width: 350,
              height: 350,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: RadialGradient(
                  colors: [
                    Colors.yellow.withOpacity(0.15),
                    Colors.transparent,
                  ],
                ),
              ),
            ),
          ),
          
          // Content
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 100, horizontal: 32),
            child: Column(
              children: [
                FittedBox(
                  fit: BoxFit.scaleDown,
                  child: ShaderMask(
                    shaderCallback: (bounds) => const LinearGradient(
                      colors: [Colors.white, Color(0xFFFFF59D)], // White to light yellow
                    ).createShader(bounds),
                    child: const Text(
                      'Don\'t Just Learn.\nStart Chirping.',
                      style: TextStyle(
                        fontSize: 52,
                        fontWeight: FontWeight.w900,
                        color: Colors.white,
                        height: 1.2,
                        letterSpacing: -0.5,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                const Text(
                  'Master 21 languages through immersive play,\ncultural insights, and real conversation.',
                  style: TextStyle(
                    fontSize: 20,
                    color: Colors.white,
                    height: 1.6,
                    fontWeight: FontWeight.w500,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 48),
                ElevatedButton(
                  onPressed: () => _scrollToSection(_languagesKey),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    foregroundColor: const Color(0xFF667EEA),
                    padding: const EdgeInsets.symmetric(horizontal: 48, vertical: 24),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30),
                    ),
                    elevation: 8,
                    shadowColor: Colors.black.withOpacity(0.3),
                  ),
                  child: const Text(
                    'Start Learning Now',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLanguagesSection(List<QueryDocumentSnapshot> languages) {
    if (languages.isEmpty) {
      return Container(
        padding: const EdgeInsets.all(40),
        child: const Center(child: Text('Coming Soon...')),
      );
    }

    return Container(
      width: double.infinity,
      key: _languagesKey,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            const Color(0xFFFFF3E0), // Light orange
            const Color(0xFFE1F5FE), // Light blue
            const Color(0xFFF3E5F5), // Light purple
          ],
        ),
      ),
      padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 24),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFFFF6B6B), Color(0xFF4ECDC4)],
              ),
              borderRadius: BorderRadius.circular(30),
            ),
            child: const Text(
              'Choose Your Language',
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'Explore our growing collection of comprehensive language courses.',
            style: TextStyle(
              fontSize: 18,
              color: Colors.grey.shade800,
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(height: 60),

          // Grid
          Container(
            constraints: const BoxConstraints(maxWidth: 1200),
            child: GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 3,
                crossAxisSpacing: 24,
                mainAxisSpacing: 24,
                childAspectRatio: 1.5,
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
          ),
        ],
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
      elevation: 4,
      shadowColor: _getLanguageColor(name).withOpacity(0.4),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
      ),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              _getLanguageColor(name).withOpacity(0.1),
              _getLanguageColor(name).withOpacity(0.3),
            ],
          ),
          border: Border.all(
            color: _getLanguageColor(name).withOpacity(0.5),
            width: 2,
          ),
        ),
        child: InkWell(
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
          borderRadius: BorderRadius.circular(20),
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: _getLanguageColor(name).withOpacity(0.3),
                        blurRadius: 12,
                        spreadRadius: 2,
                      ),
                    ],
                  ),
                  child: Text(
                    flag,
                    style: const TextStyle(fontSize: 48),
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  name,
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.grey.shade900,
                  ),
                ),
                if (nativeScript.isNotEmpty) ...[
                  const SizedBox(height: 8),
                  Text(
                    nativeScript,
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.grey.shade700,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildAboutSection() {
    return Container(
      key: _aboutKey,
      width: double.infinity,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            const Color(0xFFFFE5E5), // Light pink
            const Color(0xFFE5F5FF), // Light blue
            const Color(0xFFFFF5E5), // Light peach
          ],
        ),
      ),
      padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 24),
      child: Center(
        child: Container(
          constraints: const BoxConstraints(maxWidth: 800),
          child: Column(
            children: [
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF667EEA), Color(0xFF764BA2)],
                  ),
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF667EEA).withOpacity(0.4),
                      blurRadius: 20,
                      spreadRadius: 5,
                    ),
                  ],
                ),
                child: const Icon(Icons.auto_stories, size: 40, color: Colors.white),
              ),
              const SizedBox(height: 24),
              ShaderMask(
                shaderCallback: (bounds) => const LinearGradient(
                  colors: [Color(0xFFFF6B6B), Color(0xFF4ECDC4)],
                ).createShader(bounds),
                child: const Text(
                  'About ChirpPolly',
                  style: TextStyle(
                    fontSize: 36,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ),
              const SizedBox(height: 32),
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.8),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.1),
                      blurRadius: 20,
                      offset: const Offset(0, 10),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    Text(
                      'ChirpPolly is a next-generation language learning platform designed to make polyglotism accessible to everyone. Unlike traditional apps that lock advanced content behind paywalls, we believe in free, open access to high-quality education.',
                      style: TextStyle(
                        fontSize: 18,
                        height: 1.6,
                        color: Colors.grey.shade800,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 24),
                    Text(
                      'Our curriculum covers everything from survival basics (A1) to advanced philosophical debates (B1+), with a special focus on Japanese N3 preparation, Spanish fluency, and Indian languages like Sanskrit and Hindi. We combine rigorous spaced repetition with fun, game-like mechanics to keep you chirping.',
                      style: TextStyle(
                        fontSize: 18,
                        height: 1.6,
                        color: Colors.grey.shade800,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFooter() {
    return Container(
      width: double.infinity,
      color: Colors.grey.shade900,
      padding: const EdgeInsets.symmetric(vertical: 48, horizontal: 24),
      child: Column(
        children: [
          const Text(
            'ChirpPolly',
            style: TextStyle(
              color: Colors.white,
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            '© ${DateTime.now().year} ChirpPolly. All rights reserved.',
            style: TextStyle(
              color: Colors.grey.shade400,
              fontSize: 14,
            ),
          ),
        ],
      ),
    );
  }

  Color _getLanguageColor(String language) {
    switch (language.toLowerCase()) {
      case 'japanese': return Colors.red;
      case 'french': return Colors.blue;
      case 'spanish': return Colors.orange;
      case 'german': return Colors.amber;
      case 'chinese': return Colors.red;
      case 'korean': return Colors.purple;
      case 'italian': return Colors.green;
      case 'hindi': return Colors.orange;
      default: return Colors.blue;
    }
  }
}
