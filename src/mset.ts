import { cacheClient } from ".";
import { executeOperation } from "./utils/cacheUtils";


/**
 * Add key-value pairs to the cache without TTL.
 * @param {Array<{ key: string, val: any }>} items - An array of objects with key-value pairs to add to the cache.
 * @returns {boolean} - Returns true if all key-value pairs were added successfully.
 */
export const madd = (items: Array<{ key: string, val: any }>): boolean => {
    return executeOperation(() => {
        const results = items.map(({ key, val }) => cacheClient.set(key, val));
        return results.every((result) => result);
    });
}

/**
 * Add key-value pairs to the cache with optional TTL.
 * @param {Array<{ key: string, val: any, ttl?: number }>} items - An array of objects with key-value pairs to add to the cache.
 * @returns {boolean} - Returns true if all key-value pairs were added successfully.
 */
export const maddWithTTL = (items: Array<{ key: string, val: any, ttl?: number }>): boolean => {
    return executeOperation(() => {
        const results = items.map(({ key, val, ttl }) => {
            if (ttl) {
                return cacheClient.set(key, val, ttl);
            } else {
                return cacheClient.set(key, val);
            }
        });

        return results.every((result) => result);
    });
}


/**
 * Get the values associated with an array of keys from the cache.
 * @param {Array<string>} keys - An array of keys to retrieve values from the cache.
 * @returns {Array<any>} - An array of values corresponding to the keys.
 */
export const mget = (keys: Array<string>): Array<any> => {
    return keys.map((key) => cacheClient.get(key));
}


/**
 * Remove key-value pairs from the cache.
 * @param {Array<string>} keys - An array of keys to remove from the cache.
 * @returns {boolean} - Returns true if all keys were removed successfully.
 */
export const mremove = (keys: Array<string>): boolean => {
    return executeOperation(() => {
        const results = keys.map((key) => cacheClient.del(key));
        return results.every((result) => result);
    });
}


/**
 * Get the size (number of key-value pairs) in the cache.
 * @returns {number} - The size (number of key-value pairs) in the cache.
 */
export const mgetSize = (): number => {
    return cacheClient.keys().length;
}


/**
 * Check if a key exists in the cache.
 * @param {string} key - The key to check for existence in the cache.
 * @returns {boolean} - Returns true if the key exists in the cache, otherwise false.
 */
export const misKeyExists = (key: string): boolean => {
    return cacheClient.has(key);
}

