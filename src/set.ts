import { cacheClient, getCompoundKey } from "./cache";
import { executeOperation } from "./utils/cacheUtils";

export const addElementToSet = <T>(prefix: string, key: string, element: T): boolean => {
    return executeOperation(() => {
        const set = cacheClient.get(getCompoundKey(prefix, key)) || new Set<T>();
        set.add(element);
        return cacheClient.set(getCompoundKey(prefix, key), set);
    });
}

export const addElementToSetWithTTL = <T>(prefix: string, key: string, element: T, seconds: number): boolean => {
    return executeOperation(() => {
        const set = cacheClient.get(getCompoundKey(prefix, key)) || new Set<T>();
        set.add(element);
        return cacheClient.set(getCompoundKey(prefix, key), set, seconds);
    });
}

export const removeElementFromSet = <T>(prefix: string, key: string, element: T): boolean => {
    return executeOperation(() => {
        const set = cacheClient.get(getCompoundKey(prefix, key)) || new Set<T>();
        set.delete(element);
        return cacheClient.set(getCompoundKey(prefix, key), set);
    });
}

export const clearSet = (prefix: string, key: string): boolean => {
    return executeOperation(() => cacheClient.del(getCompoundKey(prefix, key)));
}

export const getSetElements = <T>(prefix: string, key: string): Set<T> | undefined => {
    return cacheClient.get(getCompoundKey(prefix, key));
}

export const getSetSize = (prefix: string, key: string): number => {
    const set = cacheClient.get(getCompoundKey(prefix, key)) || new Set();
    return set.size;
}