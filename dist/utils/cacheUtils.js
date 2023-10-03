"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flushAll = exports.getCacheStatistics = exports.executeOperation = void 0;
const __1 = require("..");
/**
 * Execute a caching operation and handle errors.
 * @param {Function} operation - The caching operation to execute.
 * @returns {any} - The result of the operation or undefined in case of an error.
 */
const executeOperation = (operation) => {
    try {
        return operation();
    }
    catch (error) {
        console.error("Caching operation failed", error);
    }
    return undefined;
};
exports.executeOperation = executeOperation;
const getCacheStatistics = () => {
    return __1.cacheClient.getStats();
};
exports.getCacheStatistics = getCacheStatistics;
/**
 * Flush (clear) the entire cache.
 */
const flushAll = () => {
    __1.cacheClient.flushAll();
};
exports.flushAll = flushAll;
