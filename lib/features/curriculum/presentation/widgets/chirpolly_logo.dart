import 'package:flutter/material.dart';

class ChirPollyLogo extends StatelessWidget {
  final double fontSize;
  final bool isWhite;

  const ChirPollyLogo({
    super.key,
    this.fontSize = 32, // Increased default font size
    this.isWhite = false,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        // Parrot mascot image
        Image.asset(
          'assets/images/parrot_transparent.png',
          height: fontSize * 1.5,
          errorBuilder: (context, error, stackTrace) {
            return SizedBox(width: fontSize * 1.5, height: fontSize * 1.5);
          },
        ),
        const SizedBox(width: 8),
        // ChirPolly Text
        _buildLetter('C', isWhite ? Colors.white : Colors.blue.shade600),
        _buildLetter('h', isWhite ? Colors.white : Colors.red.shade500),
        _buildLetter('i', isWhite ? Colors.white : Colors.orange.shade600),
        _buildLetter('r', isWhite ? Colors.white : Colors.yellow.shade700),
        _buildLetter('P', isWhite ? Colors.white : Colors.green.shade600),
        _buildLetter('o', isWhite ? Colors.white : Colors.teal.shade600),
        _buildLetter('l', isWhite ? Colors.white : Colors.purple.shade600),
        _buildLetter('l', isWhite ? Colors.white : Colors.pink.shade600),
        _buildLetter('y', isWhite ? Colors.white : Colors.deepPurple.shade600),
      ],
    );
  }

  Widget _buildLetter(String char, Color color) {
    return Text(
      char,
      style: TextStyle(
        fontSize: fontSize,
        fontWeight: FontWeight.bold,
        color: color,
        letterSpacing: 0.5,
      ),
    );
  }
}
