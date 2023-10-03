"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHashSetSize = exports.clearHashSet = exports.removeFromHashSet = exports.getValuesFromHashSet = exports.getFieldNamesFromHashSet = exports.getFromHashSet = exports.addToHashSetWithTTL = exports.addToHashSet = void 0;
const _1 = require(".");
const cache_1 = require("./cache");
const cacheUtils_1 = require("./utils/cacheUtils");
/**
 * Add a key-value pair to a HashSet in the cache without TTL.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the HashSet.
 * @param {string} field - The field name within the HashSet.
 * @param {any} value - The value associated with the field.
 * @returns {boolean} - Returns true if the key-value pair was added successfully.
 */
const addToHashSet = (prefix, key, field, value) => {
    return (0, cacheUtils_1.executeOperation)(() => {
        const hashSet = _1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || {};
        hashSet[field] = value;
        return _1.cacheClient.set((0, cache_1.getCompoundKey)(prefix, key), hashSet);
    });
};
exports.addToHashSet = addToHashSet;
/**
 * Add a key-value pair to a HashSet in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the HashSet.
 * @param {string} field - The field name within the HashSet.
 * @param {any} value - The value associated with the field.
 * @param {number} seconds - Time-to-live (TTL) in seconds.
 * @returns {boolean} - Returns true if the key-value pair was added successfully.
 */
const addToHashSetWithTTL = (prefix, key, field, value, seconds) => {
    return (0, cacheUtils_1.executeOperation)(() => {
        const hashSet = _1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || {};
        hashSet[field] = value;
        return _1.cacheClient.set((0, cache_1.getCompoundKey)(prefix, key), hashSet, seconds);
    });
};
exports.addToHashSetWithTTL = addToHashSetWithTTL;
/**
 * Get the value associated with a field in a HashSet.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the HashSet.
 * @param {string} field - The field name within the HashSet.
 * @returns {any} - The value associated with the field, or undefined if not found.
 */
const getFromHashSet = (prefix, key, field) => {
    const hashSet = _1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || {};
    return hashSet[field];
};
exports.getFromHashSet = getFromHashSet;
/**
 * Get all field names from a HashSet in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the HashSet.
 * @returns {string[]} - An array of all field names in the HashSet.
 */
const getFieldNamesFromHashSet = (prefix, key) => {
    const hashSet = _1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || {};
    return Object.keys(hashSet);
};
exports.getFieldNamesFromHashSet = getFieldNamesFromHashSet;
/**
 * Get all values from a HashSet in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the HashSet.
 * @returns {any[]} - An array of all values in the HashSet.
 */
const getValuesFromHashSet = (prefix, key) => {
    const hashSet = _1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || {};
    return Object.values(hashSet);
};
exports.getValuesFromHashSet = getValuesFromHashSet;
/**
 * Remove a field from a HashSet.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the HashSet.
 * @param {string} field - The field name within the HashSet to remove.
 * @returns {boolean} - Returns true if the field was removed successfully.
 */
const removeFromHashSet = (prefix, key, field) => {
    return (0, cacheUtils_1.executeOperation)(() => {
        const hashSet = _1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || {};
        if (field in hashSet) {
            delete hashSet[field];
            return _1.cacheClient.set((0, cache_1.getCompoundKey)(prefix, key), hashSet);
        }
        return false;
    });
};
exports.removeFromHashSet = removeFromHashSet;
/**
 * Clear a HashSet in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the HashSet to clear.
 * @returns {boolean} - Returns true if the HashSet was cleared successfully.
 */
const clearHashSet = (prefix, key) => {
    return (0, cacheUtils_1.executeOperation)(() => _1.cacheClient.del((0, cache_1.getCompoundKey)(prefix, key)));
};
exports.clearHashSet = clearHashSet;
/**
 * Get the size (number of fields) of a HashSet in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the HashSet.
 * @returns {number} - The size (number of fields) of the HashSet.
 */
const getHashSetSize = (prefix, key) => {
    const hashSet = _1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || {};
    return Object.keys(hashSet).length;
};
exports.getHashSetSize = getHashSetSize;
