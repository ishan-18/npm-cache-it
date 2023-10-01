# npm-cache-it

A caching library for JavaScript and TypeScript that simplifies caching operations in your applications.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)

## Installation

You can install `npm-cache-it` via npm or yarn:

```bash
npm install npm-cache-it
# or
yarn add npm-cache-it
```

## Usage

To use `npm-cache-it` in your JavaScript or TypeScript project, follow these steps:

### Import the Package

```javascript
const {
    getCachedData,
    putDataInCache,
    putDataInCacheWithTTL,
    clearCacheData,
} = require('npm-cache-it');
```

### Cache Data
#### `putDataInCache(prefix: string, key: string, data: any): boolean`
Cache data with an optional time-to-live (TTL) of 0 seconds.
```javascript
putDataInCache('myPrefix', 'myKey', 'someData');
```

#### `putDataInCacheWithTTL(prefix: string, key: string, data: any, seconds: number): boolean`
Cache data with a specified time-to-live (TTL) in seconds.
```javascript
putDataInCacheWithTTL('myPrefix', 'myKey', 'someData', 60);
```

### Retrieve Cached Data
#### `getCachedData<T>(prefix: string, key: string): T | undefined`
Retrieve cached data from the cache.
```javascript
const cachedData = getCachedData('myPrefix', 'myKey');
```

### Clear Cached Data
#### `clearCacheData(prefix: string, key: string): number`
Clear cached data.
```javascript
clearCacheData('myPrefix', 'myKey');
```
Replace 'myPrefix' and 'myKey' with your specific cache prefix and key when using these functions. These functions allow you to easily cache and retrieve data in your JavaScript or TypeScript applications.

## API
#### `getCachedData<T>(prefix: string, key: string): T | undefined`
Retrieve cached data from the cache.
1. `prefix (string)`: A string prefix for the cache key.
2. `key (string)`: The key to identify the cached data.

#### `putDataInCache(prefix: string, key: string, data: any): boolean`
Cache data with an optional time-to-live (TTL) of 0 seconds.
1. `prefix (string)`: A string prefix for the cache key.
2. `key (string)`: The key to identify the cached data.
3. `data (any)`: The data to be cached.

#### `putDataInCacheWithTTL(prefix: string, key: string, data: any, seconds: number): boolean`
Cache data with a specified time-to-live (TTL) in seconds.
1. `prefix (string)`: A string prefix for the cache key.
2. `key (string)`: The key to identify the cached data.
3. `data (any)`: The data to be cached.
4. `seconds (number)`: The TTL in seconds.

#### `clearCacheData(prefix: string, key: string): number`
Clear cached data.
1. `prefix (string)`: A string prefix for the cache key.
2. `key (string)`: The key to identify the cached data.