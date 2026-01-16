import '../entities/user_entity.dart';

abstract class AuthRepository {
  /// Sign in with email and password
  Future<UserEntity?> signIn(String email, String password);
  
  /// Sign up with email and password
  Future<UserEntity?> signUp(String email, String password);
  
  /// Sign out the current user
  Future<void> signOut();
  
  /// Get the current authenticated user
  UserEntity? getCurrentUser();
  
  /// Stream of authentication state changes
  Stream<UserEntity?> authStateChanges();

  /// Delete the current user's account
  Future<void> deleteAccount();
}
