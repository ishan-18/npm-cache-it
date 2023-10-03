import { cacheClient } from "..";

/**
 * Execute a caching operation and handle errors.
 * @param {Function} operation - The caching operation to execute.
 * @returns {any} - The result of the operation or undefined in case of an error.
 */
export const executeOperation = <T>(operation: any) => {
    try {
        return operation();
    } catch (error) {
        console.error("Caching operation failed", error);
    }
    return undefined;
}

/**
 * Get cache statistics including size, hits, misses, and keys.
 * @returns {CacheStatistics} - Cache statistics object.
 */
export interface CacheStatistics {
    size: number;
    hits: number;
    misses: number;
    keys: string[];
}

export const getCacheStatistics = (): CacheStatistics => {
    return cacheClient.getStats();
};

/**
 * Flush (clear) the entire cache.
 */
export const flushAll = () => {
    cacheClient.flushAll();
};
