import NodeCache from "node-cache";

const cacheClient: any = new NodeCache();

export const getCacheStatistics = () => {
    const stats: any = {
        size: cacheClient.getStats().keys,
        hits: cacheClient.stats.hits,
        misses: cacheClient.stats.misses,
        keys: cacheClient.keys(),
    };
    return stats;
};

export const getCachedData = <T>(prefix: string, key: string) => {
    return executeOperation(() => cacheClient.get(getCompoundKey(prefix, key)));
}

export const putDataInCache = <T>(prefix: string, key: string, data: T): boolean => {
    return putDataInCacheWithTTL(prefix, key, data, 0);
}

export const putDataInCacheWithTTL = <T>(prefix: string, key: string, data: T, seconds: number): boolean => {
    return executeOperation(() => cacheClient.set(getCompoundKey(prefix, key), data, seconds));
}

export const clearCacheData = <T>(prefix: string, key: string): number => {
    return executeOperation(() => cacheClient.del(getCompoundKey(prefix, key)));
}

export const getCompoundKey = (prefix: string, key: string) => `${prefix}_${key}`;

export const executeOperation = <T>(operation: any) => {
    try {
        return operation();
    } catch (error) {
        console.error("Caching operation failed", error);
    }
    return undefined;
}
