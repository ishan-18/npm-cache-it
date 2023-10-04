"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToEndOfList = exports.addToStartOfList = exports.getSliceOfList = exports.hasItemInList = exports.getItemAtIndexFromList = exports.replaceItemInList = exports.getListLength = exports.clearList = exports.removeItemFromList = exports.getAllItemsFromList = exports.addItemToList = void 0;
const _1 = require(".");
const cache_1 = require("./cache"); // Make sure to import the necessary dependencies
const cacheUtils_1 = require("./utils/cacheUtils");
/**
 * Add an item to a list in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @param {any} item - The item to add to the list.
 * @returns {boolean} - Returns true if the item was added successfully.
 */
const addItemToList = (prefix, key, item) => {
    return (0, cacheUtils_1.executeOperation)(() => {
        const list = _1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || [];
        list.push(item);
        return _1.cacheClient.set((0, cache_1.getCompoundKey)(prefix, key), list);
    });
};
exports.addItemToList = addItemToList;
/**
 * Get all items from a list in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @returns {any[]} - An array of all items in the list.
 */
const getAllItemsFromList = (prefix, key) => {
    return _1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || [];
};
exports.getAllItemsFromList = getAllItemsFromList;
/**
 * Remove an item from a list in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @param {any} itemToRemove - The item to remove from the list.
 * @returns {boolean} - Returns true if the item was removed successfully.
 */
const removeItemFromList = (prefix, key, itemToRemove) => {
    return (0, cacheUtils_1.executeOperation)(() => {
        const list = _1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || [];
        const index = list.indexOf(itemToRemove);
        if (index !== -1) {
            list.splice(index, 1);
            return _1.cacheClient.set((0, cache_1.getCompoundKey)(prefix, key), list);
        }
        return false;
    });
};
exports.removeItemFromList = removeItemFromList;
/**
 * Clear all items from a list in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @returns {boolean} - Returns true if the list was cleared successfully.
 */
const clearList = (prefix, key) => {
    return (0, cacheUtils_1.executeOperation)(() => _1.cacheClient.del((0, cache_1.getCompoundKey)(prefix, key)));
};
exports.clearList = clearList;
/**
 * Get the length (number of items) of a list in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @returns {number} - The length (number of items) of the list.
 */
const getListLength = (prefix, key) => {
    const list = _1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || [];
    return list.length;
};
exports.getListLength = getListLength;
/**
 * Replace an item at a specific index in a list in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @param {number} index - The index at which to replace the item.
 * @param {any} newItem - The new item to replace the existing one.
 * @returns {boolean} - Returns true if the item was replaced successfully.
 */
const replaceItemInList = (prefix, key, index, newItem) => {
    return (0, cacheUtils_1.executeOperation)(() => {
        const list = _1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || [];
        if (index >= 0 && index < list.length) {
            list[index] = newItem;
            return _1.cacheClient.set((0, cache_1.getCompoundKey)(prefix, key), list);
        }
        return false;
    });
};
exports.replaceItemInList = replaceItemInList;
/**
 * Get an item at a specific index from a list in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @param {number} index - The index of the item to retrieve.
 * @returns {any | undefined} - The item at the specified index, or undefined if the index is out of range.
 */
const getItemAtIndexFromList = (prefix, key, index) => {
    const list = _1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || [];
    if (index >= 0 && index < list.length) {
        return list[index];
    }
    return undefined;
};
exports.getItemAtIndexFromList = getItemAtIndexFromList;
/**
 * Check if an item exists in a list in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @param {any} itemToCheck - The item to check for existence.
 * @returns {boolean} - Returns true if the item exists in the list, otherwise false.
 */
const hasItemInList = (prefix, key, itemToCheck) => {
    const list = _1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || [];
    return list.includes(itemToCheck);
};
exports.hasItemInList = hasItemInList;
/**
 * Get a slice of a list in the cache, based on start and end indices.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @param {number} start - The starting index (inclusive) for the slice.
 * @param {number} end - The ending index (exclusive) for the slice.
 * @returns {any[]} - An array containing the slice of items from the list.
 */
const getSliceOfList = (prefix, key, start, end) => {
    const list = _1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || [];
    return list.slice(start, end);
};
exports.getSliceOfList = getSliceOfList;
/**
 * Add an item to the beginning of a list in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @param {any} item - The item to add to the beginning of the list.
 * @returns {number} - The new length of the list after adding the item.
 */
const addToStartOfList = (prefix, key, item) => {
    return (0, cacheUtils_1.executeOperation)(() => {
        const list = _1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || [];
        list.unshift(item);
        _1.cacheClient.set((0, cache_1.getCompoundKey)(prefix, key), list);
        return list.length;
    });
};
exports.addToStartOfList = addToStartOfList;
/**
 * Add an item to the end of a list in the cache.
 * @param {string} prefix - The prefix for the cache key.
 * @param {string} key - The key for the list.
 * @param {any} item - The item to add to the end of the list.
 * @returns {number} - The new length of the list after adding the item.
 */
const addToEndOfList = (prefix, key, item) => {
    return (0, cacheUtils_1.executeOperation)(() => {
        const list = _1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || [];
        list.push(item);
        _1.cacheClient.set((0, cache_1.getCompoundKey)(prefix, key), list);
        return list.length;
    });
};
exports.addToEndOfList = addToEndOfList;
