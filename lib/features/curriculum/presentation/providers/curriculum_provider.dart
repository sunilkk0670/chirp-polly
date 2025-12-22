import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/repositories/curriculum_repository.dart';
import '../../data/models/language_curriculum_model.dart';

/// Provider for CurriculumRepository
final curriculumRepositoryProvider = Provider<CurriculumRepository>((ref) {
  return CurriculumRepository();
});

/// Provider for all curriculum data
final allCurriculaProvider = Provider<List<LanguageCurriculumModel>>((ref) {
  final repository = ref.watch(curriculumRepositoryProvider);
  return repository.getAllCurricula();
});

/// Provider for available languages
final availableLanguagesProvider = Provider<List<String>>((ref) {
  final repository = ref.watch(curriculumRepositoryProvider);
  return repository.getAvailableLanguages();
});

/// Provider for selected language (default: Japanese)
final selectedLanguageProvider = StateProvider<String>((ref) => 'Japanese');

/// Provider for curriculum of selected language
final selectedCurriculumProvider = Provider<LanguageCurriculumModel?>((ref) {
  final repository = ref.watch(curriculumRepositoryProvider);
  final selectedLanguage = ref.watch(selectedLanguageProvider);
  return repository.getCurriculumByLanguage(selectedLanguage);
});

/// Provider for lesson count of selected language
final lessonCountProvider = Provider<int>((ref) {
  final repository = ref.watch(curriculumRepositoryProvider);
  final selectedLanguage = ref.watch(selectedLanguageProvider);
  return repository.getLessonCount(selectedLanguage);
});
