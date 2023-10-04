import { cacheClient } from ".";
import { getCompoundKey } from "./cache"; // Make sure to import the necessary dependencies
import { executeOperation } from "./utils/cacheUtils";

/**
 * Add an item to a list in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @param {any} item - The item to add to the list.
 * @returns {boolean} - Returns true if the item was added successfully.
 */
export const addItemToList = (prefix: string, key: string, item: any): boolean => {
    return executeOperation(() => {
        const list = cacheClient.get(getCompoundKey(prefix, key)) || [];
        list.push(item);
        return cacheClient.set(getCompoundKey(prefix, key), list);
    });
}

/**
 * Get all items from a list in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @returns {any[]} - An array of all items in the list.
 */
export const getAllItemsFromList = (prefix: string, key: string): any[] => {
    return cacheClient.get(getCompoundKey(prefix, key)) || [];
}

/**
 * Remove an item from a list in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @param {any} itemToRemove - The item to remove from the list.
 * @returns {boolean} - Returns true if the item was removed successfully.
 */
export const removeItemFromList = (prefix: string, key: string, itemToRemove: any): boolean => {
    return executeOperation(() => {
        const list = cacheClient.get(getCompoundKey(prefix, key)) || [];
        const index = list.indexOf(itemToRemove);
        if (index !== -1) {
            list.splice(index, 1);
            return cacheClient.set(getCompoundKey(prefix, key), list);
        }
        return false;
    });
}

/**
 * Clear all items from a list in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @returns {boolean} - Returns true if the list was cleared successfully.
 */
export const clearList = (prefix: string, key: string): boolean => {
    return executeOperation(() => cacheClient.del(getCompoundKey(prefix, key)));
}

/**
 * Get the length (number of items) of a list in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @returns {number} - The length (number of items) of the list.
 */
export const getListLength = (prefix: string, key: string): number => {
    const list = cacheClient.get(getCompoundKey(prefix, key)) || [];
    return list.length;
}

/**
 * Replace an item at a specific index in a list in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @param {number} index - The index at which to replace the item.
 * @param {any} newItem - The new item to replace the existing one.
 * @returns {boolean} - Returns true if the item was replaced successfully.
 */
export const replaceItemInList = (prefix: string, key: string, index: number, newItem: any): boolean => {
    return executeOperation(() => {
        const list = cacheClient.get(getCompoundKey(prefix, key)) || [];
        if (index >= 0 && index < list.length) {
            list[index] = newItem;
            return cacheClient.set(getCompoundKey(prefix, key), list);
        }
        return false;
    });
}

/**
 * Get an item at a specific index from a list in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @param {number} index - The index of the item to retrieve.
 * @returns {any | undefined} - The item at the specified index, or undefined if the index is out of range.
 */
export const getItemAtIndexFromList = (prefix: string, key: string, index: number): any | undefined => {
    const list = cacheClient.get(getCompoundKey(prefix, key)) || [];
    if (index >= 0 && index < list.length) {
        return list[index];
    }
    return undefined;
}

/**
 * Check if an item exists in a list in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @param {any} itemToCheck - The item to check for existence.
 * @returns {boolean} - Returns true if the item exists in the list, otherwise false.
 */
export const hasItemInList = (prefix: string, key: string, itemToCheck: any): boolean => {
    const list = cacheClient.get(getCompoundKey(prefix, key)) || [];
    return list.includes(itemToCheck);
}

/**
 * Get a slice of a list in the cache, based on start and end indices.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @param {number} start - The starting index (inclusive) for the slice.
 * @param {number} end - The ending index (exclusive) for the slice.
 * @returns {any[]} - An array containing the slice of items from the list.
 */
export const getSliceOfList = (prefix: string, key: string, start: number, end: number): any[] => {
    const list = cacheClient.get(getCompoundKey(prefix, key)) || [];
    return list.slice(start, end);
}

/**
 * Add an item to the beginning of a list in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @param {any} item - The item to add to the beginning of the list.
 * @returns {number} - The new length of the list after adding the item.
 */
export const addToStartOfList = (prefix: string, key: string, item: any): number => {
    return executeOperation(() => {
        const list = cacheClient.get(getCompoundKey(prefix, key)) || [];
        list.unshift(item);
        cacheClient.set(getCompoundKey(prefix, key), list);
        return list.length;
    });
}

/**
 * Add an item to the end of a list in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @param {any} item - The item to add to the end of the list.
 * @returns {number} - The new length of the list after adding the item.
 */
export const addToEndOfList = (prefix: string, key: string, item: any): number => {
    return executeOperation(() => {
        const list = cacheClient.get(getCompoundKey(prefix, key)) || [];
        list.push(item);
        cacheClient.set(getCompoundKey(prefix, key), list);
        return list.length;
    });
}

