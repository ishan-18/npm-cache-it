"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.misKeyExists = exports.mgetSize = exports.mremove = exports.mget = exports.maddWithTTL = exports.madd = void 0;
const _1 = require(".");
const cacheUtils_1 = require("./utils/cacheUtils");
/**
 * Add key-value pairs to the cache without TTL.
 * @param {Array<{ key: string, val: any }>} items - An array of objects with key-value pairs to add to the cache.
 * @returns {boolean} - Returns true if all key-value pairs were added successfully.
 */
const madd = (items) => {
    return (0, cacheUtils_1.executeOperation)(() => {
        const results = items.map(({ key, val }) => _1.cacheClient.set(key, val));
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
    return (0, cacheUtils_1.executeOperation)(() => {
        const results = items.map(({ key, val, ttl }) => {
            if (ttl) {
                return _1.cacheClient.set(key, val, ttl);
            }
            else {
                return _1.cacheClient.set(key, val);
            }
        });
        return results.every((result) => result);
    });
};
exports.maddWithTTL = maddWithTTL;
/**
 * Get the values associated with an array of keys from the cache.
 * @param {Array<string>} keys - An array of keys to retrieve values from the cache.
 * @returns {Array<any>} - An array of values corresponding to the keys.
 */
const mget = (keys) => {
    return keys.map((key) => _1.cacheClient.get(key));
};
exports.mget = mget;
/**
 * Remove key-value pairs from the cache.
 * @param {Array<string>} keys - An array of keys to remove from the cache.
 * @returns {boolean} - Returns true if all keys were removed successfully.
 */
const mremove = (keys) => {
    return (0, cacheUtils_1.executeOperation)(() => {
        const results = keys.map((key) => _1.cacheClient.del(key));
        return results.every((result) => result);
    });
};
exports.mremove = mremove;
/**
 * Get the size (number of key-value pairs) in the cache.
 * @returns {number} - The size (number of key-value pairs) in the cache.
 */
const mgetSize = () => {
    return _1.cacheClient.keys().length;
};
exports.mgetSize = mgetSize;
/**
 * Check if a key exists in the cache.
 * @param {string} key - The key to check for existence in the cache.
 * @returns {boolean} - Returns true if the key exists in the cache, otherwise false.
 */
const misKeyExists = (key) => {
    return _1.cacheClient.has(key);
};
exports.misKeyExists = misKeyExists;
