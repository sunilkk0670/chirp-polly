import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'levels_page.dart';
import '../../../auth/presentation/providers/auth_providers.dart';

class HomePage extends ConsumerStatefulWidget {
  const HomePage({super.key});

  @override
  ConsumerState<HomePage> createState() => _HomePageState();
}

class _HomePageState extends ConsumerState<HomePage> with SingleTickerProviderStateMixin {
  final ScrollController _scrollController = ScrollController();
  final GlobalKey _languagesKey = GlobalKey();
  late AnimationController _parrotController;
  late Animation<double> _parrotAnimation;

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
  void initState() {
    super.initState();
    _parrotController = AnimationController(
      duration: const Duration(seconds: 3),
      vsync: this,
    )..repeat(reverse: true);
    
    _parrotAnimation = Tween<double>(begin: -10, end: 10).animate(
      CurvedAnimation(parent: _parrotController, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _parrotController.dispose();
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
        persistentFooterButtons: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              TextButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/compliance');
                },
                child: Text(
                  'Terms of Service',
                  style: TextStyle(
                    color: Colors.grey.shade600,
                    fontSize: 12,
                  ),
                ),
              ),
              Text(
                '•',
                style: TextStyle(
                  color: Colors.grey.shade400,
                  fontSize: 12,
                ),
              ),
              TextButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/compliance');
                },
                child: Text(
                  'Privacy Policy',
                  style: TextStyle(
                    color: Colors.grey.shade600,
                    fontSize: 12,
                  ),
                ),
              ),
            ],
          ),
        ],
        appBar: AppBar(
          elevation: 0,
          backgroundColor: Colors.white,
          surfaceTintColor: Colors.white,
          toolbarHeight: 80,
          centerTitle: false,
          title: Padding(
            padding: const EdgeInsets.only(left: 16.0),
                        child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
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
                    const SizedBox(width: 20.0),
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
                ShaderMask(
                  shaderCallback: (bounds) => const LinearGradient(
                    colors: [Color(0xFF6A4CBC), Color(0xFF2E3192), Color(0xFFFF6B6B)],
                  ).createShader(bounds),
                  child: const Text(
                    'Every voice. Every language. One world !',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                      letterSpacing: 0.5,
                    ),
                  ),
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
              onPressed: () => Navigator.pushNamed(context, '/about'),
              child: Text(
                'About',
                style: TextStyle(
                  color: Colors.grey.shade800,
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            const SizedBox(width: 16),
            // Login/Logout button
            Consumer(
              builder: (context, ref, child) {
                final currentUser = ref.watch(currentUserProvider);
                
                if (currentUser != null) {
                  // User is logged in - show logout button
                  return PopupMenuButton<String>(
                    offset: const Offset(0, 50),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      decoration: BoxDecoration(
                        color: const Color(0xFF6A4CBC).withOpacity(0.1),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(
                            Icons.account_circle,
                            color: const Color(0xFF6A4CBC),
                            size: 20,
                          ),
                          const SizedBox(width: 6),
                          Text(
                            currentUser.email.split('@')[0],
                            style: const TextStyle(
                              color: Color(0xFF6A4CBC),
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          const SizedBox(width: 4),
                          Icon(
                            Icons.arrow_drop_down,
                            color: const Color(0xFF6A4CBC),
                            size: 20,
                          ),
                        ],
                      ),
                    ),
                    itemBuilder: (context) => [
                      PopupMenuItem<String>(
                        value: 'logout',
                        child: Row(
                          children: [
                            Icon(Icons.logout, size: 18, color: Colors.grey.shade700),
                            const SizedBox(width: 8),
                            const Text('Sign Out'),
                          ],
                        ),
                      ),
                      PopupMenuItem<String>(
                        value: 'delete_account',
                        child: Row(
                          children: [
                            Icon(Icons.person_remove_outlined, size: 18, color: Colors.red.shade400),
                            const SizedBox(width: 8),
                            Text(
                              'Delete Account',
                              style: TextStyle(color: Colors.red.shade400),
                            ),
                          ],
                        ),
                      ),
                    ],
                    onSelected: (value) async {
                      if (value == 'logout') {
                        await ref.read(authControllerProvider.notifier).signOut();
                      } else if (value == 'delete_account') {
                        _showDeleteAccountConfirmation(context, ref);
                      }
                    },
                  );
                } else {
                  // User is not logged in - this shouldn't happen due to AuthGate
                  // but we'll show login button just in case
                  return TextButton(
                    onPressed: () {
                      Navigator.pushNamed(context, '/login');
                    },
                    child: Text(
                      'Login',
                      style: TextStyle(
                        color: Colors.grey.shade800,
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  );
                }
              },
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
                              Padding(
                                padding: const EdgeInsets.only(bottom: 20),
                                child: FittedBox(
                                  fit: BoxFit.scaleDown,
                                  child: ShaderMask(
                                    shaderCallback: (bounds) => const LinearGradient(
                                      colors: [Color(0xFF2E3192), Color(0xFF6A4CBC)],
                                    ).createShader(bounds),
                                    child: Text(
                                      'Don\'t Just Learn.\nStart Chirping.',
                                      style: TextStyle(
                                        fontSize: isDesktop ? 64 : 42,
                                        fontWeight: FontWeight.bold, // Bold
                                        color: Colors.white,
                                        height: 1.25,
                                        letterSpacing: -0.5, // Tight letter spacing
                                      ),
                                      textAlign: isDesktop
                                          ? TextAlign.start
                                          : TextAlign.center,
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(height: 24),
                              ShaderMask(
                                shaderCallback: (bounds) => const LinearGradient(
                                  colors: [Color(0xFF2E3192), Color(0xFF4A90E2)],
                                ).createShader(bounds),
                                child: Text(
                                  'Break barriers. Preserve heritage.\nConnect with the world—one conversation at a time.',
                                  style: TextStyle(
                                    fontSize: 18, // Size 18
                                    color: Colors.white,
                                    height: 1.5, // Line height 1.5
                                    fontWeight: FontWeight.w600,
                                  ),
                                  textAlign: isDesktop
                                      ? TextAlign.start
                                      : TextAlign.center,
                                ),
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
                              child: AnimatedBuilder(
                                animation: _parrotAnimation,
                                builder: (context, child) {
                                  return Transform.translate(
                                    offset: Offset(0, _parrotAnimation.value),
                                    child: child,
                                  );
                                },
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
            child: LayoutBuilder(
              builder: (context, constraints) {
                final width = constraints.maxWidth;
                final crossAxisCount = width < 600 ? 1 : (width < 900 ? 2 : 3);
                // Lower ratio = taller cards. Mobile needs height for Flag + Name + Native Name.
                // 0.9 ensures plenty of room for 2-3 lines of text.
                final childAspectRatio = width < 600 ? 0.9 : 1.3;

                return GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: crossAxisCount,
                    crossAxisSpacing: 24,
                    mainAxisSpacing: 24,
                    childAspectRatio: childAspectRatio,
                  ),
                  itemCount: languages.length,
                  itemBuilder: (context, index) {
                    final languageDoc = languages[index];
                    final languageData = languageDoc.data() as Map<String, dynamic>;
                    
                    return _LanguageCard(
                      languageId: languageDoc.id,
                      flag: languageData['flag'] ?? '🌍',
                      name: languageData['name'] ?? 'Unknown',
                      nativeScript: languageData['nativeScript'] ?? languageData['nativeName'] ?? '',
                      color: _getLanguageColor(languageData['name'] ?? 'Unknown'),
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

  void _showDeleteAccountConfirmation(BuildContext context, WidgetRef ref) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Account?'),
        content: const Text(
          'This action is permanent and will delete all your progress and data. '
          'For security reasons, you may need to log in again before this action can be completed.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(
              'Cancel',
              style: TextStyle(color: Colors.grey.shade600),
            ),
          ),
          ElevatedButton(
            onPressed: () async {
              Navigator.pop(context); // Close dialog
              await ref.read(authControllerProvider.notifier).deleteAccount();
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.red.shade400,
              foregroundColor: Colors.white,
            ),
            child: const Text('Delete Permanently'),
          ),
        ],
      ),
    );
  }
}

class _LanguageCard extends StatefulWidget {
  final String languageId;
  final String flag;
  final String name;
  final String nativeScript;
  final Color color;

  const _LanguageCard({
    required this.languageId,
    required this.flag,
    required this.name,
    required this.nativeScript,
    required this.color,
  });

  @override
  State<_LanguageCard> createState() => _LanguageCardState();
}

class _LanguageCardState extends State<_LanguageCard> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        transform: Matrix4.identity()
          ..translate(0, _isHovered ? -10.0 : 0.0),
          child: Card(
            elevation: _isHovered ? 12 : 4,
            shadowColor: widget.color.withOpacity(0.4),
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
                  widget.color.withOpacity(0.1),
                  widget.color.withOpacity(0.3),
                ],
              ),
              border: Border.all(
                color: widget.color.withOpacity(_isHovered ? 0.8 : 0.5),
                width: 2,
              ),
            ),
            child: InkWell(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => LevelsPage(
                      languageId: widget.languageId,
                      languageName: widget.name,
                      flag: widget.flag,
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
                            color: widget.color.withOpacity(0.3),
                            blurRadius: 12,
                            spreadRadius: 2,
                          ),
                        ],
                      ),
                      child: Text(
                        widget.flag,
                        style: const TextStyle(fontSize: 48),
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      widget.name,
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: Colors.grey.shade900,
                      ),
                    ),
                    const SizedBox(height: 8),
                    if (widget.nativeScript.isNotEmpty) ...[
                      Text(
                        widget.nativeScript,
                        textAlign: TextAlign.center,
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
        ),
      ),
    );
  }
}
