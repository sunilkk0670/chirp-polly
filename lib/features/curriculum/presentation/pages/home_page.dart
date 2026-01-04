import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
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
          centerTitle: false,
          title: Padding(
            padding: const EdgeInsets.only(left: 16.0),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                // Parrot mascot image
                Image.asset(
                  'assets/images/parrot_transparent.png',
                  height: 48.0,
                  errorBuilder: (context, error, stackTrace) {
                    return const SizedBox(width: 48, height: 48);
                  },
                ),
                const SizedBox(width: 10.0),
                // ChirPolly colorful text
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    _buildBrandLetter('C', Colors.blue.shade600),
                    _buildBrandLetter('h', Colors.red.shade500),
                    _buildBrandLetter('i', Colors.orange.shade600),
                    _buildBrandLetter('r', Colors.amber.shade700),
                    _buildBrandLetter('P', Colors.green.shade600),
                    _buildBrandLetter('o', Colors.teal.shade600),
                    _buildBrandLetter('l', Colors.purple.shade600),
                    _buildBrandLetter('l', Colors.pink.shade600),
                    _buildBrandLetter('y', Colors.deepPurple.shade600),
                  ],
                ),
              ],
            ),
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
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.centerLeft,
          end: Alignment.centerRight,
          colors: [
            Color(0xFFD0E4FF), // Soft Sky Blue
            Color(0xFFE0D7FF), // Light Lavender
          ],
        ),
      ),
      child: Stack(
        children: [
          // Content
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 24),
            child: LayoutBuilder(
              builder: (context, constraints) {
                // Responsive Breakpoint
                bool isDesktop = constraints.maxWidth > 900;

                return Center(
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 1200),
                    child: Flex(
                      direction: isDesktop ? Axis.horizontal : Axis.vertical,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        // Left Text Section (Flex 3)
                        Expanded(
                          flex: isDesktop ? 3 : 0,
                          child: Column(
                            crossAxisAlignment: isDesktop
                                ? CrossAxisAlignment.start
                                : CrossAxisAlignment.center,
                            children: [
                              FittedBox(
                                fit: BoxFit.scaleDown,
                                child: Text(
                                  'Don\'t Just Learn.\nStart Chirping.',
                                  style: TextStyle(
                                    fontSize: isDesktop ? 64 : 42,
                                    fontWeight: FontWeight.bold, // Bold
                                    color: const Color(0xFF2E3192), // Deep Indigo
                                    height: 1.1,
                                    letterSpacing: -0.5, // Tight letter spacing
                                  ),
                                  textAlign: isDesktop
                                      ? TextAlign.start
                                      : TextAlign.center,
                                ),
                              ),
                              const SizedBox(height: 24),
                              Text(
                                'Master 21 languages through immersive play,\ncultural insights, and real conversation.',
                                style: TextStyle(
                                  fontSize: 18, // Size 18
                                  color: const Color(0xFF2E3192).withOpacity(0.8),
                                  height: 1.5, // Line height 1.5
                                  fontWeight: FontWeight.normal,
                                ),
                                textAlign: isDesktop
                                    ? TextAlign.start
                                    : TextAlign.center,
                              ),
                              const SizedBox(height: 48),
                              
                              // CTA Button
                              Container(
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(50),
                                  boxShadow: [
                                    BoxShadow(
                                      color: const Color(0xFF6A4CBC).withOpacity(0.3),
                                      offset: const Offset(0, 4),
                                      blurRadius: 10,
                                    ),
                                  ],
                                ),
                                child: ElevatedButton(
                                  onPressed: () => _scrollToSection(_languagesKey),
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: const Color(0xFF6A4CBC), // Solid Purple
                                    foregroundColor: Colors.white,
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 48, vertical: 24),
                                    shape: const StadiumBorder(), // Fully rounded
                                    elevation: 0, // Using Container shadow instead for specific look
                                  ),
                                  child: const Text(
                                    'Start Learning Now',
                                    style: TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                              ),
                              if (!isDesktop) const SizedBox(height: 40),
                            ],
                          ),
                        ),
                        
                        // Right Image Section (Flex 2)
                        if (isDesktop) const SizedBox(width: 20),
                        
                        Expanded( // Changed from Flexible to Expanded for strict 3:2 ratio implementation in flex
                          flex: isDesktop ? 2 : 0,
                          child: ConstrainedBox(
                            constraints: BoxConstraints(
                              maxHeight: isDesktop ? 600 : 400,
                            ),
                            child: Padding(
                              padding: const EdgeInsets.only(right: 20.0), // Slight padding to right
                              child: Image.asset(
                                'assets/images/parrot_transparent.png',
                                fit: BoxFit.contain,
                                errorBuilder: (context, error, stackTrace) {
                                  return const SizedBox(
                                    height: 200,
                                    child: Center(
                                      child: Icon(Icons.image_not_supported,
                                          size: 64, color: Colors.black26),
                                    ),
                                  );
                                },
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
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

  Widget _buildBrandLetter(String char, Color color) {
    return Text(
      char,
      style: TextStyle(
        fontSize: 28.0,
        fontWeight: FontWeight.bold,
        color: color,
        letterSpacing: 0.5,
      ),
    );
  }
}
