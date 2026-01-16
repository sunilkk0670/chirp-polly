import '../../domain/entities/user_entity.dart';
import '../../domain/repositories/auth_repository.dart';
import '../datasources/firebase_auth_datasource.dart';

class AuthRepositoryImpl implements AuthRepository {
  final FirebaseAuthDataSource _dataSource;

  AuthRepositoryImpl(this._dataSource);

  @override
  Future<UserEntity?> signIn(String email, String password) async {
    return await _dataSource.signIn(email, password);
  }

  @override
  Future<UserEntity?> signUp(String email, String password) async {
    return await _dataSource.signUp(email, password);
  }

  @override
  Future<void> signOut() async {
    return await _dataSource.signOut();
  }

  @override
  UserEntity? getCurrentUser() {
    return _dataSource.getCurrentUser();
  }

  @override
  Stream<UserEntity?> authStateChanges() {
    return _dataSource.authStateChanges();
  }

  @override
  Future<void> deleteAccount() async {
    return await _dataSource.deleteAccount();
  }
}
