import { cacheClient } from ".";
import { executeOperation } from "./utils/cacheUtils";

/**
 * Get data from the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The specific key to retrieve data.
 * @returns {T | undefined} - The cached data associated with the key, or undefined if not found.
 */
export const getCachedData = <T>(prefix: string, key: string) => {
    return executeOperation(() => cacheClient.get(getCompoundKey(prefix, key)));
}


/**
 * Put data into the cache without a TTL (Time-to-Live).
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The specific key to store data.
 * @param {T} data - The data to be stored in the cache.
 * @returns {boolean} - Returns true if the data was successfully stored in the cache.
 */
export const putDataInCache = <T>(prefix: string, key: string, data: T): boolean => {
    return putDataInCacheWithTTL(prefix, key, data, 0);
}


/**
 * Put data into the cache with a TTL (Time-to-Live).
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The specific key to store data.
 * @param {T} data - The data to be stored in the cache.
 * @param {number} seconds - Time-to-Live (TTL) in seconds. Use 0 for no expiration.
 * @returns {boolean} - Returns true if the data was successfully stored in the cache.
 */
export const putDataInCacheWithTTL = <T>(prefix: string, key: string, data: T, seconds: number): boolean => {
    return executeOperation(() => cacheClient.set(getCompoundKey(prefix, key), data, seconds));
}


/**
 * Clear data from the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The specific key to clear from the cache.
 * @returns {number} - The number of items removed from the cache (0 if the key was not found).
 */
export const clearCacheData = <T>(prefix: string, key: string): number => {
    return executeOperation(() => cacheClient.del(getCompoundKey(prefix, key)));
}


/**
 * Generate a compound cache key by combining a prefix and a key.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The specific key.
 * @returns {string} - The compound cache key.
 */
export const getCompoundKey = (prefix: string, key: string) => `${prefix}_${key}`;


/**
 * Check if a specific key has expired in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The specific key to check for expiration.
 * @returns {boolean} - Returns true if the key has expired, otherwise false.
 */
export const checkCacheExpiry = (prefix: string, key: string): boolean => {
    const ttl = cacheClient.getTtl(getCompoundKey(prefix, key));
    return ttl !== undefined && ttl < 0;
}


/**
 * Set the Time-to-Live (TTL) for a specific key in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The specific key to set TTL for.
 * @param {number} seconds - Time-to-Live (TTL) in seconds. Use 0 for no expiration.
 * @returns {boolean} - Returns true if the TTL was set successfully, otherwise false.
 */
export const setCacheTTL = (prefix: string, key: string, seconds: number): boolean => {
    return executeOperation(() => cacheClient.ttl(getCompoundKey(prefix, key), seconds));
}


/**
 * Increment the value associated with a specific key in the cache by a specified delta.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The specific key to increment the value for.
 * @param {number} delta - The amount by which to increment the value.
 * @returns {number | undefined} - The new value associated with the key after incrementing, or undefined if the key was not found.
 */
export const incrementCacheValue = (prefix: string, key: string, delta: number): number | undefined => {
    return executeOperation(() => cacheClient.incrby(getCompoundKey(prefix, key), delta));
}


/**
 * Decrement the value associated with a specific key in the cache by a specified delta.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The specific key to decrement the value for.
 * @param {number} delta - The amount by which to decrement the value.
 * @returns {number | undefined} - The new value associated with the key after decrementing, or undefined if the key was not found.
 */
export const decrementCacheValue = (prefix: string, key: string, delta: number): number | undefined => {
    return executeOperation(() => cacheClient.decrby(getCompoundKey(prefix, key), delta));
}


/**
 * Get an array of cache keys that match a specified prefix pattern.
 * @param {string} prefix - The prefix to search for in cache keys.
 * @returns {string[]} - An array of cache keys matching the specified prefix pattern.
 */
export const getKeysWithPrefix = (prefix: string): string[] => {
    return cacheClient.keys(`^${prefix}_.*`);
}


/**
 * Flush all cache entries with a specific prefix.
 * @param {string} prefix - The prefix for the cache entries to flush.
 */
export const flushCacheWithPrefix = (prefix: string): void => {
    const keys = cacheClient.keys(`^${prefix}_.*`);
    keys.forEach((key: string) => cacheClient.del(key));
}


/**
 * Get all cache keys.
 * @returns {string[]} - An array of all cache keys.
 */
export const getAllCacheKeys = (): string[] => {
    return cacheClient.keys();
}
