"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCacheKeys = exports.flushCacheWithPrefix = exports.getKeysWithPrefix = exports.decrementCacheValue = exports.incrementCacheValue = exports.setCacheTTL = exports.checkCacheExpiry = exports.getCompoundKey = exports.clearCacheData = exports.putDataInCacheWithTTL = exports.putDataInCache = exports.getCachedData = void 0;
const _1 = require(".");
const cacheUtils_1 = require("./utils/cacheUtils");
/**
 * Get data from the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The specific key to retrieve data.
 * @returns {T | undefined} - The cached data associated with the key, or undefined if not found.
 */
const getCachedData = (prefix, key) => {
    return (0, cacheUtils_1.executeOperation)(() => _1.cacheClient.get((0, exports.getCompoundKey)(prefix, key)));
};
exports.getCachedData = getCachedData;
/**
 * Put data into the cache without a TTL (Time-to-Live).
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The specific key to store data.
 * @param {T} data - The data to be stored in the cache.
 * @returns {boolean} - Returns true if the data was successfully stored in the cache.
 */
const putDataInCache = (prefix, key, data) => {
    return (0, exports.putDataInCacheWithTTL)(prefix, key, data, 0);
};
exports.putDataInCache = putDataInCache;
/**
 * Put data into the cache with a TTL (Time-to-Live).
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The specific key to store data.
 * @param {T} data - The data to be stored in the cache.
 * @param {number} seconds - Time-to-Live (TTL) in seconds. Use 0 for no expiration.
 * @returns {boolean} - Returns true if the data was successfully stored in the cache.
 */
const putDataInCacheWithTTL = (prefix, key, data, seconds) => {
    return (0, cacheUtils_1.executeOperation)(() => _1.cacheClient.set((0, exports.getCompoundKey)(prefix, key), data, seconds));
};
exports.putDataInCacheWithTTL = putDataInCacheWithTTL;
/**
 * Clear data from the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The specific key to clear from the cache.
 * @returns {number} - The number of items removed from the cache (0 if the key was not found).
 */
const clearCacheData = (prefix, key) => {
    return (0, cacheUtils_1.executeOperation)(() => _1.cacheClient.del((0, exports.getCompoundKey)(prefix, key)));
};
exports.clearCacheData = clearCacheData;
/**
 * Generate a compound cache key by combining a prefix and a key.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The specific key.
 * @returns {string} - The compound cache key.
 */
const getCompoundKey = (prefix, key) => `${prefix}_${key}`;
exports.getCompoundKey = getCompoundKey;
/**
 * Check if a specific key has expired in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The specific key to check for expiration.
 * @returns {boolean} - Returns true if the key has expired, otherwise false.
 */
const checkCacheExpiry = (prefix, key) => {
    const ttl = _1.cacheClient.getTtl((0, exports.getCompoundKey)(prefix, key));
    return ttl !== undefined && ttl < 0;
};
exports.checkCacheExpiry = checkCacheExpiry;
/**
 * Set the Time-to-Live (TTL) for a specific key in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The specific key to set TTL for.
 * @param {number} seconds - Time-to-Live (TTL) in seconds. Use 0 for no expiration.
 * @returns {boolean} - Returns true if the TTL was set successfully, otherwise false.
 */
const setCacheTTL = (prefix, key, seconds) => {
    return (0, cacheUtils_1.executeOperation)(() => _1.cacheClient.ttl((0, exports.getCompoundKey)(prefix, key), seconds));
};
exports.setCacheTTL = setCacheTTL;
/**
 * Increment the value associated with a specific key in the cache by a specified delta.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The specific key to increment the value for.
 * @param {number} delta - The amount by which to increment the value.
 * @returns {number | undefined} - The new value associated with the key after incrementing, or undefined if the key was not found.
 */
const incrementCacheValue = (prefix, key, delta) => {
    return (0, cacheUtils_1.executeOperation)(() => _1.cacheClient.incrby((0, exports.getCompoundKey)(prefix, key), delta));
};
exports.incrementCacheValue = incrementCacheValue;
/**
 * Decrement the value associated with a specific key in the cache by a specified delta.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The specific key to decrement the value for.
 * @param {number} delta - The amount by which to decrement the value.
 * @returns {number | undefined} - The new value associated with the key after decrementing, or undefined if the key was not found.
 */
const decrementCacheValue = (prefix, key, delta) => {
    return (0, cacheUtils_1.executeOperation)(() => _1.cacheClient.decrby((0, exports.getCompoundKey)(prefix, key), delta));
};
exports.decrementCacheValue = decrementCacheValue;
/**
 * Get an array of cache keys that match a specified prefix pattern.
 * @param {string} prefix - The prefix to search for in cache keys.
 * @returns {string[]} - An array of cache keys matching the specified prefix pattern.
 */
const getKeysWithPrefix = (prefix) => {
    return _1.cacheClient.keys(`^${prefix}_.*`);
};
exports.getKeysWithPrefix = getKeysWithPrefix;
/**
 * Flush all cache entries with a specific prefix.
 * @param {string} prefix - The prefix for the cache entries to flush.
 */
const flushCacheWithPrefix = (prefix) => {
    const keys = _1.cacheClient.keys(`^${prefix}_.*`);
    keys.forEach((key) => _1.cacheClient.del(key));
};
exports.flushCacheWithPrefix = flushCacheWithPrefix;
/**
 * Get all cache keys.
 * @returns {string[]} - An array of all cache keys.
 */
const getAllCacheKeys = () => {
    return _1.cacheClient.keys();
};
exports.getAllCacheKeys = getAllCacheKeys;
