import '../datasources/firestore_curriculum_datasource.dart';
import '../datasources/curriculum_cache.dart';
import '../datasources/curriculum_data.dart';
import '../models/language_curriculum_model.dart';
import '../models/module_model.dart';

/// Repository for accessing curriculum data
/// Follows the Repository pattern from Clean Architecture
/// Now uses Firestore with caching for dynamic content
class CurriculumRepository {
  final FirestoreCurriculumDatasource _firestoreDatasource;
  final CurriculumCache _cache;
  
  CurriculumRepository({
    FirestoreCurriculumDatasource? firestoreDatasource,
    CurriculumCache? cache,
  })  : _firestoreDatasource = firestoreDatasource ?? FirestoreCurriculumDatasource(),
        _cache = cache ?? CurriculumCache();

  /// Get modules for a specific language and level
  /// Cache-first strategy: checks cache, then Firestore, falls back to static data
  Future<List<ModuleModel>> getModules(String language, String level) async {
    print('🔍 CurriculumRepository.getModules($language, $level)');
    
    // 1. Check cache first
    final cached = _cache.getCachedModules(language, level);
    if (cached != null && cached.isNotEmpty) {
      print('✅ Returning ${cached.length} modules from cache');
      return cached;
    }

    // 2. Fetch from Firestore
    try {
      final modules = await _firestoreDatasource.fetchModules(language, level);
      
      if (modules.isNotEmpty) {
        // Cache the result
        _cache.cacheModules(language, level, modules);
        print('✅ Fetched and cached ${modules.length} modules from Firestore');
        return modules;
      }
    } catch (e) {
      print('⚠️ Firestore fetch failed: $e');
    }

    // 3. Fallback to static data (for backward compatibility)
    print('📚 Falling back to static data');
    return _getStaticModules(language, level);
  }

  /// Stream version for real-time updates
  Stream<List<ModuleModel>> watchModules(String language, String level) {
    return _firestoreDatasource.watchModules(language, level);
  }

  /// Get all curriculum data (legacy method - uses static data)
  List<LanguageCurriculumModel> getAllCurricula() {
    return CurriculumData.batch1Data;
  }

  /// Get curriculum for a specific language (legacy method)
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

  /// Get module by ID (searches Firestore first, then static data)
  Future<ModuleModel?> getModuleById(String moduleId) async {
    // Try to extract language and level from moduleId
    // Format: language_level_m# (e.g., spanish_a2_m1)
    final parts = moduleId.split('_');
    if (parts.length >= 3) {
      final language = parts[0];
      final level = parts[1];
      
      try {
        final modules = await getModules(language, level);
        return modules.firstWhere((m) => m.id == moduleId);
      } catch (e) {
        // Continue to static fallback
      }
    }

    // Fallback to static data
    for (final curriculum in CurriculumData.batch1Data) {
      try {
        return curriculum.modules.firstWhere((module) => module.id == moduleId);
      } catch (e) {
        continue;
      }
    }
    return null;
  }

  /// Get all modules for a specific language (legacy - A1 only from static)
  List<ModuleModel> getModulesByLanguage(String language) {
    final curriculum = getCurriculumByLanguage(language);
    return curriculum?.modules ?? [];
  }

  /// Get total lesson count for a language (legacy)
  int getLessonCount(String language) {
    final curriculum = getCurriculumByLanguage(language);
    if (curriculum == null) return 0;

    return curriculum.modules.fold(
      0,
      (total, module) => total + module.lessons.length,
    );
  }

  /// Clear cache
  void clearCache() {
    _cache.clearCache();
  }

  /// Get cache statistics
  Map<String, dynamic> getCacheStats() {
    return _cache.getCacheStats();
  }

  /// Helper: Get static modules for fallback
  List<ModuleModel> _getStaticModules(String language, String level) {
    if (level.toLowerCase() != 'a1') {
      return []; // Static data only has A1
    }
    
    final curriculum = getCurriculumByLanguage(language);
    return curriculum?.modules ?? [];
  }
}
