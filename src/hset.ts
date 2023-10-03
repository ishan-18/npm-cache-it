import { cacheClient } from ".";
import { getCompoundKey } from "./cache";
import { executeOperation } from "./utils/cacheUtils";


/**
 * Add a key-value pair to a HashSet in the cache without TTL.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the HashSet.
 * @param {string} field - The field name within the HashSet.
 * @param {any} value - The value associated with the field.
 * @returns {boolean} - Returns true if the key-value pair was added successfully.
 */
export const addToHashSet = (prefix: string, key: string, field: string, value: any): boolean => {
    return executeOperation(() => {
        const hashSet = cacheClient.get(getCompoundKey(prefix, key)) || {};
        hashSet[field] = value;
        return cacheClient.set(getCompoundKey(prefix, key), hashSet);
    });
}


/**
 * Add a key-value pair to a HashSet in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the HashSet.
 * @param {string} field - The field name within the HashSet.
 * @param {any} value - The value associated with the field.
 * @param {number} seconds - Time-to-live (TTL) in seconds.
 * @returns {boolean} - Returns true if the key-value pair was added successfully.
 */
export const addToHashSetWithTTL = (prefix: string, key: string, field: string, value: any, seconds: number): boolean => {
    return executeOperation(() => {
        const hashSet = cacheClient.get(getCompoundKey(prefix, key)) || {};
        hashSet[field] = value;
        return cacheClient.set(getCompoundKey(prefix, key), hashSet, seconds);
    });
}

/**
 * Get the value associated with a field in a HashSet.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the HashSet.
 * @param {string} field - The field name within the HashSet.
 * @returns {any} - The value associated with the field, or undefined if not found.
 */
export const getFromHashSet = (prefix: string, key: string, field: string): any => {
    const hashSet = cacheClient.get(getCompoundKey(prefix, key)) || {};
    return hashSet[field];
}


/**
 * Get all field names from a HashSet in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the HashSet.
 * @returns {string[]} - An array of all field names in the HashSet.
 */
export const getFieldNamesFromHashSet = (prefix: string, key: string): string[] => {
    const hashSet = cacheClient.get(getCompoundKey(prefix, key)) || {};
    return Object.keys(hashSet);
}


/**
 * Get all values from a HashSet in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the HashSet.
 * @returns {any[]} - An array of all values in the HashSet.
 */
export const getValuesFromHashSet = (prefix: string, key: string): any[] => {
    const hashSet = cacheClient.get(getCompoundKey(prefix, key)) || {};
    return Object.values(hashSet);
}


/**
 * Remove a field from a HashSet.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the HashSet.
 * @param {string} field - The field name within the HashSet to remove.
 * @returns {boolean} - Returns true if the field was removed successfully.
 */
export const removeFromHashSet = (prefix: string, key: string, field: string): boolean => {
    return executeOperation(() => {
        const hashSet = cacheClient.get(getCompoundKey(prefix, key)) || {};
        if (field in hashSet) {
            delete hashSet[field];
            return cacheClient.set(getCompoundKey(prefix, key), hashSet);
        }
        return false;
    });
}

/**
 * Clear a HashSet in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the HashSet to clear.
 * @returns {boolean} - Returns true if the HashSet was cleared successfully.
 */
export const clearHashSet = (prefix: string, key: string): boolean => {
    return executeOperation(() => cacheClient.del(getCompoundKey(prefix, key)));
}


/**
 * Get the size (number of fields) of a HashSet in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the HashSet.
 * @returns {number} - The size (number of fields) of the HashSet.
 */
export const getHashSetSize = (prefix: string, key: string): number => {
    const hashSet = cacheClient.get(getCompoundKey(prefix, key)) || {};
    return Object.keys(hashSet).length;
}