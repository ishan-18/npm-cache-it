import { cacheClient } from "./index";
import { getCompoundKey } from "./cache";
import { executeOperation } from "./utils/cacheUtils";


/**
 * Add an element to a Set within the cache.
 * If the Set does not exist, it will be created.
 *
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the Set.
 * @param {T} element - The element to add to the Set.
 * @returns {boolean} - Returns true if the element was added successfully, otherwise false.
*/
export const addElementToSet = <T>(prefix: string, key: string, element: T): boolean => {
    return executeOperation(() => {
        const set = cacheClient.get(getCompoundKey(prefix, key)) || new Set<T>();
        set.add(element);
        return cacheClient.set(getCompoundKey(prefix, key), set);
    });
}


/**
 * Add multiple elements to a Set within the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the Set.
 * @param {T[]} elements - An array of elements to add to the Set.
 * @returns {boolean} - Returns true if all elements were added successfully, otherwise false.
 */
export const addElementsToSet = <T>(prefix: string, key: string, elements: T[]): boolean => {
    return executeOperation(() => {
        const set = cacheClient.get(getCompoundKey(prefix, key)) || new Set<T>();
        elements.forEach(element => set.add(element));
        return cacheClient.set(getCompoundKey(prefix, key), set);
    });
}


/**
 * Add an element to a Set within the cache with a Time-to-Live (TTL).
 * If the Set does not exist, it will be created.
 *
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the Set.
 * @param {T} element - The element to add to the Set.
 * @param {number} seconds - Time-to-Live (TTL) in seconds. Use 0 for no expiration.
 * @returns {boolean} - Returns true if the element was added successfully, otherwise false.
 */
export const addElementToSetWithTTL = <T>(prefix: string, key: string, element: T, seconds: number): boolean => {
    return executeOperation(() => {
        const set = cacheClient.get(getCompoundKey(prefix, key)) || new Set<T>();
        set.add(element);
        return cacheClient.set(getCompoundKey(prefix, key), set, seconds);
    });
}

/**
 * Add multiple elements to a Set within the cache with a Time-To-Live (TTL).
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the Set.
 * @param {T[]} elements - An array of elements to add to the Set.
 * @param {number} ttl - Time-To-Live (TTL) in seconds for the cached Set.
 * @returns {boolean} - Returns true if all elements were added successfully, otherwise false.
 */
export const addElementsToSetWithTTL = <T>(prefix: string, key: string, elements: T[], ttl: number): boolean => {
    return executeOperation(() => {
        const cacheKey = getCompoundKey(prefix, key);
        const set = cacheClient.get(cacheKey) || new Set<T>();
        elements.forEach(element => set.add(element));

        // Set the cache value with TTL
        return cacheClient.setex(cacheKey, ttl, set);
    });
}


/**
 * Remove a specific element from a Set within the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the Set.
 * @param {T} element - The element to remove from the Set.
 * @returns {boolean} - Returns true if the element was successfully removed, otherwise false.
 */
export const removeElementFromSet = <T>(prefix: string, key: string, element: T): boolean => {
    return executeOperation(() => {
        const set = cacheClient.get(getCompoundKey(prefix, key)) || new Set<T>();
        set.delete(element);
        return cacheClient.set(getCompoundKey(prefix, key), set);
    });
}


/**
 * Remove multiple elements from a Set within the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the Set.
 * @param {T[]} elements - An array of elements to remove from the Set.
 * @returns {boolean} - Returns true if all elements were removed successfully, otherwise false.
 */
export const removeElementsFromSet = <T>(prefix: string, key: string, elements: T[]): boolean => {
    return executeOperation(() => {
        const set = cacheClient.get(getCompoundKey(prefix, key)) || new Set<T>();
        elements.forEach(element => set.delete(element));
        return cacheClient.set(getCompoundKey(prefix, key), set);
    });
}


/**
 * Remove all elements from a Set within the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the Set.
 * @returns {boolean} - Returns true if the Set was cleared successfully, otherwise false.
 */
export const clearSet = (prefix: string, key: string): boolean => {
    return executeOperation(() => cacheClient.del(getCompoundKey(prefix, key)));
}

/**
 * Get all elements from a Set within the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the Set.
 * @returns {Set<T> | undefined} - The Set containing all elements, or undefined if not found.
 */
export const getAllElementsInSet = <T>(prefix: string, key: string): Set<T> | undefined => {
    return cacheClient.get(getCompoundKey(prefix, key));
}


/**
 * Get the size (number of elements) of a Set stored in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the Set.
 * @returns {number} - The size of the Set in the cache.
 */
export const getSetSize = (prefix: string, key: string): number => {
    const set = cacheClient.get(getCompoundKey(prefix, key)) || new Set();
    return set.size;
}

/**
 * Check if an element exists in a Set within the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the Set.
 * @param {T} element - The element to check for existence.
 * @returns {boolean} - Returns true if the element exists in the Set, otherwise false.
 */
export const hasElementInSet = <T>(prefix: string, key: string, element: T): boolean => {
    const set = cacheClient.get(getCompoundKey(prefix, key)) || new Set<T>();
    return set.has(element);
}


/**
 * Merge two or more sets from different keys into a new set.
 * @param {string} prefix - The prefix for the new cache key.
 * @param {string[]} sourceKeys - An array of source keys to merge sets from.
 * @returns {boolean} - Returns true if the merge operation was successful, otherwise false.
 */
export const unionSets = <T>(prefix: string, sourceKeys: string[]): boolean => {
    return executeOperation(() => {
        const mergedSet = new Set<T>();
        sourceKeys.forEach((sourceKey) => {
            const sourceSet = cacheClient.get(getCompoundKey(prefix, sourceKey)) || new Set<T>();
            sourceSet.forEach((element: T) => mergedSet.add(element));
        });
        return cacheClient.set(getCompoundKey(prefix, prefix), mergedSet);
    });
}


/**
 * Find the common elements between two or more sets.
 * @param {string} prefix - The prefix for the cache keys.
 * @param {string[]} sourceKeys - An array of source keys to find the intersection of sets.
 * @returns {Set<T> | undefined} - The set containing common elements, or undefined if not found.
 */
export const intersectSets = <T>(prefix: string, sourceKeys: string[]): Set<T> | undefined => {
    return executeOperation(() => {
        const intersectionSet = new Set<T>();
        const firstSourceKey = sourceKeys[0];
        const firstSet = cacheClient.get(getCompoundKey(prefix, firstSourceKey)) || new Set<T>();

        firstSet.forEach((element: T) => { // Specify type T for element
            let isCommon = true;
            for (let i = 1; i < sourceKeys.length; i++) {
                const sourceKey = sourceKeys[i];
                const sourceSet = cacheClient.get(getCompoundKey(prefix, sourceKey)) || new Set<T>();
                if (!sourceSet.has(element)) {
                    isCommon = false;
                    break;
                }
            }
            if (isCommon) {
                intersectionSet.add(element);
            }
        });

        return intersectionSet.size > 0 ? intersectionSet : undefined;
    });
}


/**
 * Find the elements that are in one set but not in another.
 * @param {string} prefix - The prefix for the cache keys.
 * @param {string} sourceKeyA - The source key for the first set.
 * @param {string} sourceKeyB - The source key for the second set.
 * @returns {Set<T> | undefined} - The set containing elements that are in set A but not in set B, or undefined if not found.
 */
export const differenceSets = <T>(prefix: string, sourceKeyA: string, sourceKeyB: string): Set<T> | undefined => {
    return executeOperation<Set<T> | undefined>(() => {
        const differenceSet = new Set<T>();
        const setA = (cacheClient.get(getCompoundKey(prefix, sourceKeyA)) as Set<T>) || new Set<T>();
        const setB = (cacheClient.get(getCompoundKey(prefix, sourceKeyB)) as Set<T>) || new Set<T>();

        setA.forEach((element: T) => {
            if (!setB.has(element)) {
                differenceSet.add(element);
            }
        });

        return differenceSet.size > 0 ? differenceSet : undefined;
    });
}