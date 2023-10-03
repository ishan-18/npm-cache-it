import NodeCache from "node-cache";

export const cacheClient: any = new NodeCache()

export * from './cache';
export * from './set';
export * from './hset';
export * from './mset';
export * from './utils/cacheUtils'