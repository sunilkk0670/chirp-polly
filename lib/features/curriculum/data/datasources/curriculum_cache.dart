import '../models/module_model.dart';

/// In-memory cache for curriculum modules
/// Reduces Firestore reads and improves performance
class CurriculumCache {
  // Cache storage: key = "language_level", value = list of modules
  final Map<String, List<ModuleModel>> _cache = {};
  
  // Cache timestamps for invalidation
  final Map<String, DateTime> _cacheTimestamps = {};
  
  // Cache duration (default: 1 hour)
  final Duration cacheDuration;

  CurriculumCache({this.cacheDuration = const Duration(hours: 1)});

  /// Gets cached modules for a language/level combination
  /// Returns null if cache miss or expired
  List<ModuleModel>? getCachedModules(String language, String level) {
    final key = _getCacheKey(language, level);
    
    // Check if cache exists
    if (!_cache.containsKey(key)) {
      print('📭 Cache miss for $key');
      return null;
    }

    // Check if cache is expired
    final timestamp = _cacheTimestamps[key];
    if (timestamp != null && DateTime.now().difference(timestamp) > cacheDuration) {
      print('⏰ Cache expired for $key');
      _cache.remove(key);
      _cacheTimestamps.remove(key);
      return null;
    }

    print('✅ Cache hit for $key (${_cache[key]!.length} modules)');
    return _cache[key];
  }

  /// Caches modules for a language/level combination
  void cacheModules(String language, String level, List<ModuleModel> modules) {
    final key = _getCacheKey(language, level);
    _cache[key] = modules;
    _cacheTimestamps[key] = DateTime.now();
    print('💾 Cached $key (${modules.length} modules)');
  }

  /// Clears all cached data
  void clearCache() {
    _cache.clear();
    _cacheTimestamps.clear();
    print('🗑️ Cache cleared');
  }

  /// Clears cache for specific language/level
  void clearCacheFor(String language, String level) {
    final key = _getCacheKey(language, level);
    _cache.remove(key);
    _cacheTimestamps.remove(key);
    print('🗑️ Cache cleared for $key');
  }

  /// Generates cache key from language and level
  String _getCacheKey(String language, String level) {
    return '${language.toLowerCase()}_${level.toLowerCase()}';
  }

  /// Gets cache statistics
  Map<String, dynamic> getCacheStats() {
    return {
      'totalCached': _cache.length,
      'keys': _cache.keys.toList(),
      'totalModules': _cache.values.fold<int>(0, (sum, list) => sum + list.length),
    };
  }
}
