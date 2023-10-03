import NodeCache from "node-cache";
import { executeOperation } from "./utils/cacheUtils";

export const cacheClient: any = new NodeCache();


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


