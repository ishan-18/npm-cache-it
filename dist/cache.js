"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCacheStatistics = exports.executeOperation = exports.getCompoundKey = exports.clearCacheData = exports.putDataInCacheWithTTL = exports.putDataInCache = exports.getCachedData = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const cacheClient = new node_cache_1.default();
const getCachedData = (prefix, key) => {
    return (0, exports.executeOperation)(() => cacheClient.get((0, exports.getCompoundKey)(prefix, key)));
};
exports.getCachedData = getCachedData;
const putDataInCache = (prefix, key, data) => {
    return (0, exports.putDataInCacheWithTTL)(prefix, key, data, 0);
};
exports.putDataInCache = putDataInCache;
const putDataInCacheWithTTL = (prefix, key, data, seconds) => {
    return (0, exports.executeOperation)(() => cacheClient.set((0, exports.getCompoundKey)(prefix, key), data, seconds));
};
exports.putDataInCacheWithTTL = putDataInCacheWithTTL;
const clearCacheData = (prefix, key) => {
    return (0, exports.executeOperation)(() => cacheClient.del((0, exports.getCompoundKey)(prefix, key)));
};
exports.clearCacheData = clearCacheData;
const getCompoundKey = (prefix, key) => `${prefix}_${key}`;
exports.getCompoundKey = getCompoundKey;
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
    return cacheClient.getStats();
};
exports.getCacheStatistics = getCacheStatistics;
