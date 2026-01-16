import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AboutPage extends StatelessWidget {
  const AboutPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          _buildSliverAppBar(context),
          SliverToBoxAdapter(
            child: _buildContent(context),
          ),
          SliverToBoxAdapter(
            child: _buildFooter(context),
          ),
        ],
      ),
    );
  }

  Widget _buildSliverAppBar(BuildContext context) {
    return SliverAppBar(
      expandedHeight: 200.0,
      floating: false,
      pinned: true,
      elevation: 0,
      backgroundColor: const Color(0xFF6A4CBC),
      flexibleSpace: FlexibleSpaceBar(
        title: Text(
          'About ChirPolly',
          style: GoogleFonts.outfit(
            fontWeight: FontWeight.bold,
            color: Colors.white,
            fontSize: 24,
          ),
        ),
        background: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                Color(0xFF6A4CBC),
                Color(0xFF2E3192),
              ],
            ),
          ),
          child: Stack(
            children: [
              Positioned(
                right: -20,
                bottom: -20,
                child: Opacity(
                  opacity: 0.2,
                  child: Image.asset(
                    'assets/images/parrot_transparent.png',
                    height: 180,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
      leading: IconButton(
        icon: const Icon(Icons.arrow_back_ios_new_rounded, color: Colors.white),
        onPressed: () => Navigator.of(context).pop(),
      ),
    );
  }

  Widget _buildContent(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            Colors.white,
            const Color(0xFFF3E5F5).withOpacity(0.3),
            const Color(0xFFE1F5FE).withOpacity(0.3),
          ],
        ),
      ),
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 40),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 800),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildSectionTitle('Our Mission'),
              const SizedBox(height: 16),
              _buildModernCard(
                child: Text(
                  'We believe everyone deserves a voice in the global conversation.\n\nLanguage shouldn\'t be a barrier to opportunity. It shouldn\'t stop a student in Bengaluru from landing their dream job, or keep ancient wisdom locked away from the world. Language should be a bridge, not a wall.',
                  style: GoogleFonts.inter(
                    fontSize: 18,
                    height: 1.6,
                    color: Colors.grey.shade800,
                  ),
                ),
              ),
              const SizedBox(height: 48),
              
              _buildSectionTitle('How we\'re different'),
              const SizedBox(height: 16),
              _buildModernCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'We make language learning simple, beautiful, and culturally rooted. ChirPolly works seamlessly across web and mobile, meeting you wherever you are—whether you\'re commuting in Tokyo, studying in Paris, or exploring your heritage in Chennai.',
                      style: GoogleFonts.inter(
                        fontSize: 18,
                        height: 1.6,
                        color: Colors.grey.shade800,
                      ),
                    ),
                    const SizedBox(height: 24),
                    Text(
                      'While others focus only on popular languages, we honor the full spectrum of human expression. From Sanskrit, the world\'s oldest language, to Spanish, Korean, and everything in between, we celebrate both heritage and horizons.',
                      style: GoogleFonts.inter(
                        fontSize: 18,
                        height: 1.6,
                        color: Colors.grey.shade800,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 48),

              _buildSectionTitle('What we\'ve built'),
              const SizedBox(height: 16),
              _buildModernCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'ChirPolly is our language learning app. It\'s designed for real people with real goals—students preparing for opportunities abroad, professionals expanding their careers, heritage seekers reconnecting with their roots, and curious minds exploring new cultures.',
                      style: GoogleFonts.inter(
                        fontSize: 18,
                        height: 1.6,
                        color: Colors.grey.shade800,
                      ),
                    ),
                    const SizedBox(height: 24),
                    Text(
                      'We\'re not just teaching vocabulary and grammar. We\'re opening doors to new conversations, new friendships, and new possibilities.',
                      style: GoogleFonts.inter(
                        fontSize: 18,
                        height: 1.6,
                        color: Colors.grey.shade800,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 64),

              Center(
                child: Column(
                  children: [
                    ShaderMask(
                      shaderCallback: (bounds) => const LinearGradient(
                        colors: [Color(0xFF6A4CBC), Color(0xFF2E3192)],
                      ).createShader(bounds),
                      child: Text(
                        'Want to speak freely?',
                        style: GoogleFonts.outfit(
                          fontSize: 32,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Join thousands of learners who are already breaking barriers and building bridges. Whether you\'re preserving the past or embracing the future, your voice matters.',
                      textAlign: TextAlign.center,
                      style: GoogleFonts.inter(
                        fontSize: 18,
                        height: 1.6,
                        color: Colors.grey.shade700,
                      ),
                    ),
                    const SizedBox(height: 32),
                    ElevatedButton(
                      onPressed: () => Navigator.of(context).pop(),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF6A4CBC),
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 20),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(30),
                        ),
                        elevation: 8,
                        shadowColor: const Color(0xFF6A4CBC).withOpacity(0.5),
                      ),
                      child: Text(
                        'Start your journey today',
                        style: GoogleFonts.outfit(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 80),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Row(
      children: [
        Container(
          width: 8,
          height: 32,
          decoration: BoxDecoration(
            color: const Color(0xFF6A4CBC),
            borderRadius: BorderRadius.circular(4),
          ),
        ),
        const SizedBox(width: 12),
        Text(
          title,
          style: GoogleFonts.outfit(
            fontSize: 28,
            fontWeight: FontWeight.bold,
            color: const Color(0xFF2E3192),
          ),
        ),
      ],
    );
  }

  Widget _buildModernCard({required Widget child}) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
        border: Border.all(
          color: Colors.grey.shade100,
          width: 1,
        ),
      ),
      child: child,
    );
  }

  Widget _buildFooter(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 60, horizontal: 24),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.bottomLeft,
          end: Alignment.topRight,
          colors: [
            Color(0xFF2E3192),
            Color(0xFF6A4CBC),
          ],
        ),
      ),
      child: Column(
        children: [
          Text(
            'ChirPolly - Where every voice finds its language.',
            textAlign: TextAlign.center,
            style: GoogleFonts.outfit(
              fontSize: 20,
              fontStyle: FontStyle.italic,
              color: Colors.white.withOpacity(0.9),
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(height: 24),
          const Divider(color: Colors.white24),
          const SizedBox(height: 24),
          Text(
            '© ${DateTime.now().year} ChirPolly. All rights reserved.',
            style: GoogleFonts.inter(
              color: Colors.white70,
              fontSize: 14,
            ),
          ),
        ],
      ),
    );
  }
}
