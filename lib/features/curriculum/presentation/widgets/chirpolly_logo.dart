import 'package:flutter/material.dart';

class ChirPollyLogo extends StatelessWidget {
  final double fontSize;
  final bool isWhite;

  const ChirPollyLogo({
    super.key,
    this.fontSize = 28,
    this.isWhite = false,
  });

  @override
  Widget build(BuildContext context) {
    if (isWhite) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            '🦜',
            style: TextStyle(fontSize: fontSize * 1.2),
          ),
          const SizedBox(width: 8),
          Text(
            'ChirPolly',
            style: TextStyle(
              fontSize: fontSize,
              fontWeight: FontWeight.bold,
              color: Colors.white,
              letterSpacing: 1.0,
            ),
          ),
        ],
      );
    }

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          '🦜',
          style: TextStyle(fontSize: fontSize * 1.2),
        ),
        const SizedBox(width: 8),
        _buildColorfulText('C', Colors.blue.shade600),
        _buildColorfulText('h', Colors.red.shade500),
        _buildColorfulText('i', Colors.orange.shade600),
        _buildColorfulText('r', Colors.yellow.shade700),
        _buildColorfulText('P', Colors.green.shade600),
        _buildColorfulText('o', Colors.teal.shade600),
        _buildColorfulText('l', Colors.purple.shade600),
        _buildColorfulText('l', Colors.pink.shade600),
        _buildColorfulText('y', Colors.deepPurple.shade600),
      ],
    );
  }

  Widget _buildColorfulText(String letter, Color color) {
    return Text(
      letter,
      style: TextStyle(
        fontSize: fontSize,
        fontWeight: FontWeight.bold,
        color: color,
        letterSpacing: 0.5,
      ),
    );
  }
}
