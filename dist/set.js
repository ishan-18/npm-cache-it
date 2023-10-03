"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.differenceSets = exports.intersectSets = exports.unionSets = exports.hasElementInSet = exports.getSetSize = exports.getAllElementsInSet = exports.clearSet = exports.removeElementsFromSet = exports.removeElementFromSet = exports.addElementsToSetWithTTL = exports.addElementToSetWithTTL = exports.addElementsToSet = exports.addElementToSet = void 0;
const index_1 = require("./index");
const cache_1 = require("./cache");
const cacheUtils_1 = require("./utils/cacheUtils");
/**
 * Add an element to a Set within the cache.
 * If the Set does not exist, it will be created.
 *
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the Set.
 * @param {T} element - The element to add to the Set.
 * @returns {boolean} - Returns true if the element was added successfully, otherwise false.
*/
const addElementToSet = (prefix, key, element) => {
    return (0, cacheUtils_1.executeOperation)(() => {
        const set = index_1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || new Set();
        set.add(element);
        return index_1.cacheClient.set((0, cache_1.getCompoundKey)(prefix, key), set);
    });
};
exports.addElementToSet = addElementToSet;
/**
 * Add multiple elements to a Set within the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the Set.
 * @param {T[]} elements - An array of elements to add to the Set.
 * @returns {boolean} - Returns true if all elements were added successfully, otherwise false.
 */
const addElementsToSet = (prefix, key, elements) => {
    return (0, cacheUtils_1.executeOperation)(() => {
        const set = index_1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || new Set();
        elements.forEach(element => set.add(element));
        return index_1.cacheClient.set((0, cache_1.getCompoundKey)(prefix, key), set);
    });
};
exports.addElementsToSet = addElementsToSet;
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
const addElementToSetWithTTL = (prefix, key, element, seconds) => {
    return (0, cacheUtils_1.executeOperation)(() => {
        const set = index_1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || new Set();
        set.add(element);
        return index_1.cacheClient.set((0, cache_1.getCompoundKey)(prefix, key), set, seconds);
    });
};
exports.addElementToSetWithTTL = addElementToSetWithTTL;
/**
 * Add multiple elements to a Set within the cache with a Time-To-Live (TTL).
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the Set.
 * @param {T[]} elements - An array of elements to add to the Set.
 * @param {number} ttl - Time-To-Live (TTL) in seconds for the cached Set.
 * @returns {boolean} - Returns true if all elements were added successfully, otherwise false.
 */
const addElementsToSetWithTTL = (prefix, key, elements, ttl) => {
    return (0, cacheUtils_1.executeOperation)(() => {
        const cacheKey = (0, cache_1.getCompoundKey)(prefix, key);
        const set = index_1.cacheClient.get(cacheKey) || new Set();
        elements.forEach(element => set.add(element));
        // Set the cache value with TTL
        return index_1.cacheClient.setex(cacheKey, ttl, set);
    });
};
exports.addElementsToSetWithTTL = addElementsToSetWithTTL;
/**
 * Remove a specific element from a Set within the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the Set.
 * @param {T} element - The element to remove from the Set.
 * @returns {boolean} - Returns true if the element was successfully removed, otherwise false.
 */
const removeElementFromSet = (prefix, key, element) => {
    return (0, cacheUtils_1.executeOperation)(() => {
        const set = index_1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || new Set();
        set.delete(element);
        return index_1.cacheClient.set((0, cache_1.getCompoundKey)(prefix, key), set);
    });
};
exports.removeElementFromSet = removeElementFromSet;
/**
 * Remove multiple elements from a Set within the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the Set.
 * @param {T[]} elements - An array of elements to remove from the Set.
 * @returns {boolean} - Returns true if all elements were removed successfully, otherwise false.
 */
const removeElementsFromSet = (prefix, key, elements) => {
    return (0, cacheUtils_1.executeOperation)(() => {
        const set = index_1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || new Set();
        elements.forEach(element => set.delete(element));
        return index_1.cacheClient.set((0, cache_1.getCompoundKey)(prefix, key), set);
    });
};
exports.removeElementsFromSet = removeElementsFromSet;
/**
 * Remove all elements from a Set within the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the Set.
 * @returns {boolean} - Returns true if the Set was cleared successfully, otherwise false.
 */
const clearSet = (prefix, key) => {
    return (0, cacheUtils_1.executeOperation)(() => index_1.cacheClient.del((0, cache_1.getCompoundKey)(prefix, key)));
};
exports.clearSet = clearSet;
/**
 * Get all elements from a Set within the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the Set.
 * @returns {Set<T> | undefined} - The Set containing all elements, or undefined if not found.
 */
const getAllElementsInSet = (prefix, key) => {
    return index_1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key));
};
exports.getAllElementsInSet = getAllElementsInSet;
/**
 * Get the size (number of elements) of a Set stored in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the Set.
 * @returns {number} - The size of the Set in the cache.
 */
const getSetSize = (prefix, key) => {
    const set = index_1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || new Set();
    return set.size;
};
exports.getSetSize = getSetSize;
/**
 * Check if an element exists in a Set within the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the Set.
 * @param {T} element - The element to check for existence.
 * @returns {boolean} - Returns true if the element exists in the Set, otherwise false.
 */
const hasElementInSet = (prefix, key, element) => {
    const set = index_1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || new Set();
    return set.has(element);
};
exports.hasElementInSet = hasElementInSet;
/**
 * Merge two or more sets from different keys into a new set.
 * @param {string} prefix - The prefix for the new cache key.
 * @param {string[]} sourceKeys - An array of source keys to merge sets from.
 * @returns {boolean} - Returns true if the merge operation was successful, otherwise false.
 */
const unionSets = (prefix, sourceKeys) => {
    return (0, cacheUtils_1.executeOperation)(() => {
        const mergedSet = new Set();
        sourceKeys.forEach((sourceKey) => {
            const sourceSet = index_1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, sourceKey)) || new Set();
            sourceSet.forEach((element) => mergedSet.add(element));
        });
        return index_1.cacheClient.set((0, cache_1.getCompoundKey)(prefix, prefix), mergedSet);
    });
};
exports.unionSets = unionSets;
/**
 * Find the common elements between two or more sets.
 * @param {string} prefix - The prefix for the cache keys.
 * @param {string[]} sourceKeys - An array of source keys to find the intersection of sets.
 * @returns {Set<T> | undefined} - The set containing common elements, or undefined if not found.
 */
const intersectSets = (prefix, sourceKeys) => {
    return (0, cacheUtils_1.executeOperation)(() => {
        const intersectionSet = new Set();
        const firstSourceKey = sourceKeys[0];
        const firstSet = index_1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, firstSourceKey)) || new Set();
        firstSet.forEach((element) => {
            let isCommon = true;
            for (let i = 1; i < sourceKeys.length; i++) {
                const sourceKey = sourceKeys[i];
                const sourceSet = index_1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, sourceKey)) || new Set();
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
};
exports.intersectSets = intersectSets;
/**
 * Find the elements that are in one set but not in another.
 * @param {string} prefix - The prefix for the cache keys.
 * @param {string} sourceKeyA - The source key for the first set.
 * @param {string} sourceKeyB - The source key for the second set.
 * @returns {Set<T> | undefined} - The set containing elements that are in set A but not in set B, or undefined if not found.
 */
const differenceSets = (prefix, sourceKeyA, sourceKeyB) => {
    return (0, cacheUtils_1.executeOperation)(() => {
        const differenceSet = new Set();
        const setA = index_1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, sourceKeyA)) || new Set();
        const setB = index_1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, sourceKeyB)) || new Set();
        setA.forEach((element) => {
            if (!setB.has(element)) {
                differenceSet.add(element);
            }
        });
        return differenceSet.size > 0 ? differenceSet : undefined;
    });
};
exports.differenceSets = differenceSets;
