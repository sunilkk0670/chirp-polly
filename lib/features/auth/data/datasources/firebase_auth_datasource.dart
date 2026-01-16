import 'package:firebase_auth/firebase_auth.dart';
import '../../domain/entities/user_entity.dart';

class FirebaseAuthDataSource {
  final FirebaseAuth _firebaseAuth;

  FirebaseAuthDataSource(this._firebaseAuth);

  /// Sign in with email and password
  Future<UserEntity?> signIn(String email, String password) async {
    try {
      final userCredential = await _firebaseAuth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      return _mapFirebaseUserToEntity(userCredential.user);
    } on FirebaseAuthException catch (e) {
      throw _handleFirebaseAuthException(e);
    }
  }

  /// Sign up with email and password
  Future<UserEntity?> signUp(String email, String password) async {
    try {
      final userCredential = await _firebaseAuth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
      return _mapFirebaseUserToEntity(userCredential.user);
    } on FirebaseAuthException catch (e) {
      throw _handleFirebaseAuthException(e);
    }
  }

  /// Sign out
  Future<void> signOut() async {
    await _firebaseAuth.signOut();
  }

  /// Delete current user account
  Future<void> deleteAccount() async {
    try {
      final user = _firebaseAuth.currentUser;
      if (user != null) {
        await user.delete();
      }
    } on FirebaseAuthException catch (e) {
      if (e.code == 'requires-recent-login') {
        throw Exception('For security reasons, please log in again before deleting your account.');
      }
      throw _handleFirebaseAuthException(e);
    }
  }

  /// Get current user
  UserEntity? getCurrentUser() {
    return _mapFirebaseUserToEntity(_firebaseAuth.currentUser);
  }

  /// Stream of auth state changes
  Stream<UserEntity?> authStateChanges() {
    return _firebaseAuth.authStateChanges().map(_mapFirebaseUserToEntity);
  }

  /// Map Firebase User to UserEntity
  UserEntity? _mapFirebaseUserToEntity(User? user) {
    if (user == null) return null;
    
    return UserEntity(
      uid: user.uid,
      email: user.email ?? '',
      displayName: user.displayName,
    );
  }

  /// Handle Firebase Auth exceptions
  Exception _handleFirebaseAuthException(FirebaseAuthException e) {
    switch (e.code) {
      case 'user-not-found':
        return Exception('No account found with this email');
      case 'wrong-password':
        return Exception('Incorrect password');
      case 'email-already-in-use':
        return Exception('An account already exists with this email');
      case 'weak-password':
        return Exception('Password should be at least 6 characters');
      case 'invalid-email':
        return Exception('Please enter a valid email address');
      case 'network-request-failed':
        return Exception('Network error. Please check your connection');
      case 'too-many-requests':
        return Exception('Too many attempts. Please try again later');
      default:
        return Exception(e.message ?? 'An error occurred. Please try again');
    }
  }
}
