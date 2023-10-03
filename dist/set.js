"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSetSize = exports.getSetElements = exports.clearSet = exports.removeElementFromSet = exports.addElementToSetWithTTL = exports.addElementToSet = void 0;
const cache_1 = require("./cache");
const addElementToSet = (prefix, key, element) => {
    return (0, cache_1.executeOperation)(() => {
        const set = cache_1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || new Set();
        set.add(element);
        return cache_1.cacheClient.set((0, cache_1.getCompoundKey)(prefix, key), set);
    });
};
exports.addElementToSet = addElementToSet;
const addElementToSetWithTTL = (prefix, key, element, seconds) => {
    return (0, cache_1.executeOperation)(() => {
        const set = cache_1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || new Set();
        set.add(element);
        return cache_1.cacheClient.set((0, cache_1.getCompoundKey)(prefix, key), set, seconds);
    });
};
exports.addElementToSetWithTTL = addElementToSetWithTTL;
const removeElementFromSet = (prefix, key, element) => {
    return (0, cache_1.executeOperation)(() => {
        const set = cache_1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || new Set();
        set.delete(element);
        return cache_1.cacheClient.set((0, cache_1.getCompoundKey)(prefix, key), set);
    });
};
exports.removeElementFromSet = removeElementFromSet;
const clearSet = (prefix, key) => {
    return (0, cache_1.executeOperation)(() => cache_1.cacheClient.del((0, cache_1.getCompoundKey)(prefix, key)));
};
exports.clearSet = clearSet;
const getSetElements = (prefix, key) => {
    return cache_1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key));
};
exports.getSetElements = getSetElements;
const getSetSize = (prefix, key) => {
    const set = cache_1.cacheClient.get((0, cache_1.getCompoundKey)(prefix, key)) || new Set();
    return set.size;
};
exports.getSetSize = getSetSize;
