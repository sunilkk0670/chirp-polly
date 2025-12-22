import '../datasources/curriculum_data.dart';
import '../models/language_curriculum_model.dart';
import '../models/module_model.dart';

/// Repository for accessing curriculum data
/// Follows the Repository pattern from Clean Architecture
class CurriculumRepository {
  /// Get all curriculum data
  List<LanguageCurriculumModel> getAllCurricula() {
    return CurriculumData.batch1Data;
  }

  /// Get curriculum for a specific language
  LanguageCurriculumModel? getCurriculumByLanguage(String language) {
    try {
      return CurriculumData.batch1Data.firstWhere(
        (curriculum) => curriculum.language.toLowerCase() == language.toLowerCase(),
      );
    } catch (e) {
      return null;
    }
  }

  /// Get all available languages
  List<String> getAvailableLanguages() {
    return CurriculumData.batch1Data.map((c) => c.language).toList();
  }

  /// Get module by ID
  ModuleModel? getModuleById(String moduleId) {
    for (final curriculum in CurriculumData.batch1Data) {
      try {
        return curriculum.modules.firstWhere((module) => module.id == moduleId);
      } catch (e) {
        continue;
      }
    }
    return null;
  }

  /// Get all modules for a specific language
  List<ModuleModel> getModulesByLanguage(String language) {
    final curriculum = getCurriculumByLanguage(language);
    return curriculum?.modules ?? [];
  }

  /// Get total lesson count for a language
  int getLessonCount(String language) {
    final curriculum = getCurriculumByLanguage(language);
    if (curriculum == null) return 0;

    return curriculum.modules.fold(
      0,
      (total, module) => total + module.lessons.length,
    );
  }
}
