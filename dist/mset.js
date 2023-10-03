"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mget = exports.misKeyExists = exports.mgetSize = exports.maddWithTTL = exports.madd = exports.mremove = void 0;
const cache_1 = require("./cache");
/**
 * Remove key-value pairs from the cache.
 * @param {Array<string>} keys - An array of keys to remove from the cache.
 * @returns {boolean} - Returns true if all keys were removed successfully.
 */
const mremove = (keys) => {
    return (0, cache_1.executeOperation)(() => {
        const results = keys.map((key) => cache_1.cacheClient.del(key));
        return results.every((result) => result);
    });
};
exports.mremove = mremove;
/**
 * Add key-value pairs to the cache without TTL.
 * @param {Array<{ key: string, val: any }>} items - An array of objects with key-value pairs to add to the cache.
 * @returns {boolean} - Returns true if all key-value pairs were added successfully.
 */
const madd = (items) => {
    return (0, cache_1.executeOperation)(() => {
        const results = items.map(({ key, val }) => cache_1.cacheClient.set(key, val));
        return results.every((result) => result);
    });
};
exports.madd = madd;
/**
 * Add key-value pairs to the cache with optional TTL.
 * @param {Array<{ key: string, val: any, ttl?: number }>} items - An array of objects with key-value pairs to add to the cache.
 * @returns {boolean} - Returns true if all key-value pairs were added successfully.
 */
const maddWithTTL = (items) => {
    return (0, cache_1.executeOperation)(() => {
        const results = items.map(({ key, val, ttl }) => {
            if (ttl) {
                return cache_1.cacheClient.set(key, val, ttl);
            }
            else {
                return cache_1.cacheClient.set(key, val);
            }
        });
        return results.every((result) => result);
    });
};
exports.maddWithTTL = maddWithTTL;
/**
 * Get the size (number of key-value pairs) in the cache.
 * @returns {number} - The size (number of key-value pairs) in the cache.
 */
const mgetSize = () => {
    return cache_1.cacheClient.keys().length;
};
exports.mgetSize = mgetSize;
/**
 * Check if a key exists in the cache.
 * @param {string} key - The key to check for existence in the cache.
 * @returns {boolean} - Returns true if the key exists in the cache, otherwise false.
 */
const misKeyExists = (key) => {
    return cache_1.cacheClient.has(key);
};
exports.misKeyExists = misKeyExists;
/**
 * Get the values associated with an array of keys from the cache.
 * @param {Array<string>} keys - An array of keys to retrieve values from the cache.
 * @returns {Array<any>} - An array of values corresponding to the keys.
 */
const mget = (keys) => {
    return keys.map((key) => cache_1.cacheClient.get(key));
};
exports.mget = mget;
