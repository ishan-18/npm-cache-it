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

### Generate a Compound Cache Key
#### `getCompoundKey`: Generate a compound cache key by combining a prefix and a key.
```javascript
const prefix = 'myPrefix';
const key = 'myKey';
const compoundKey = getCompoundKey(prefix, key);
console.log(`Compound Cache Key: ${compoundKey}`);
```

### Check Cache Expiry
#### `checkCacheExpiry`: Check if a specific key has expired in the cache.
```javascript
const prefix = 'myPrefix';
const key = 'myKey';
const isExpired = checkCacheExpiry(prefix, key);
console.log(`Key ${key} has expired: ${isExpired}`);
```

### Set Cache TTL
#### `setCacheTTL`: Set the Time-to-Live (TTL) for a specific key in the cache.
```javascript
const prefix = 'myPrefix';
const key = 'myKey';
const seconds = 3600; // 1 hour
const isSet = setCacheTTL(prefix, key, seconds);
console.log(`TTL for key ${key} set: ${isSet}`);
```

### Increment Cache Value
#### `incrementCacheValue`: Increment the value associated with a specific key in the cache by a specified delta.
```javascript
const prefix = 'myPrefix';
const key = 'myKey';
const delta = 5;
const newValue = incrementCacheValue(prefix, key, delta);
console.log(`New value for key ${key}: ${newValue}`);
```

### Decrement Cache Value
#### `decrementCacheValue`: Decrement the value associated with a specific key in the cache by a specified delta.
```javascript
const prefix = 'myPrefix';
const key = 'myKey';
const delta = 2;
const newValue = decrementCacheValue(prefix, key, delta);
console.log(`New value for key ${key}: ${newValue}`);
```

### Get Cache Keys with Prefix
#### `getKeysWithPrefix`: Get an array of cache keys that match a specified prefix pattern.
```javascript
const prefix = 'myPrefix';
const matchingKeys = getKeysWithPrefix(prefix);
console.log(`Cache keys matching prefix ${prefix}: ${matchingKeys.join(', ')}`);
```

### Flush Cache Entries with Prefix
#### `flushCacheWithPrefix`: Flush all cache entries with a specific prefix.
```javascript
const prefix = 'myPrefix';
flushCacheWithPrefix(prefix);
console.log(`All cache entries with prefix ${prefix} have been flushed.`);
```

### Get All Cache Keys
#### `getAllCacheKeys`: Get an array of all cache keys.
```javascript
const allKeys = getAllCacheKeys();
console.log(`All cache keys: ${allKeys.join(', ')}`);
```

### Flush All the keys
#### `flushAll`: Deletes All the keys present in the cache.
```javascript
flushAll()
```

Replace 'myPrefix' and 'myKey' with your specific cache prefix and key when using these functions. These functions allow you to easily cache and retrieve data in your JavaScript or TypeScript applications.

## Set
### Add Element to Set
#### `addElementToSet`**: Add an element to a Set within the cache.
```javascript
addElementToSet('myPrefix', 'mySetKey', 'someElement');
```

### Add Muitple Elements to Set
#### `addElementsToSet`: Add multiple elements to a Set within the cache.
```javascript
addElementsToSet('myPrefix', 'mySetKey', ['element1', 'element2', 'element3']);
```

### Add Element to Set With TTL
#### `addElementToSetWithTTL`: Add an element to a Set within the cache with a Time-to-Live (TTL).
```javascript
addElementToSetWithTTL('myPrefix', 'mySetKey', 'someElement', 3600); // Cache with a TTL of 1 hour
```

### Add Multiple Elements to Set With TTL
#### `addElementsToSetWithTTL`**: Add multiple elements to a Set within the cache with a Time-To-Live (TTL).

```javascript
addElementsToSetWithTTL('myPrefix', 'mySetKey', ['element1', 'element2'], 1800); // Cache with a TTL of
```

### Remove Element From Set
#### `removeElementFromSet`: Remove a specific element from a Set within the cache.
```javascript
removeElementFromSet('myPrefix', 'mySetKey', 'elementToRemove');
```

### Remove Multiple Elements From Set
#### `removeElementsFromSet`: Remove multiple elements from a Set within the cache.
```javascript
removeElementsFromSet('myPrefix', 'mySetKey', ['element1', 'element2']);
```

### Clear all elememts from Set
#### `clearSet`: Remove all elements from a Set within the cache.
```javascript
clearSet('myPrefix', 'mySetKey');
```

### Retrieve all elements from Set
#### `getAllElementsInSet`: Get all elements from a Set within the cache.
```javascript
const elements = getAllElementsInSet('myPrefix', 'mySetKey');
```

### Get the Set Size
#### `getSetSize`: Get the size (number of elements) of a Set stored in the cache.
```javascript
const setSize = getSetSize('myPrefix', 'mySetKey');
```

### Element Present in Set or not
#### `hasElementInSet`: Check if an element exists in a Set within the cache.
```javascript
const exists = hasElementInSet('myPrefix', 'mySetKey', 'elementToCheck');
```

### Union of Sets
#### `unionSets`: Merge two or more sets from different keys into a new set.
```javascript
unionSets('myPrefix', ['sourceKey1', 'sourceKey2'], 'mergedSetKey');
```

### Intersection of Sets
#### `intersectSets`: Find the common elements between two or more sets.
```javascript
const commonElements = intersectSets('myPrefix', ['sourceKey1', 'sourceKey2']);
```

### Difference in Sets
#### `differenceSets`: Find the elements that are in one set but not in another.
```javascript
const differingElements = differenceSets('myPrefix', 'sourceKeyA', 'sourceKeyB');
```

## HashSet
### Add to HashSet
#### `addToHashSet`: Add a key-value pair to a HashSet in the cache without TTL.
```javascript
addToHashSet('myPrefix', 'myHashSetKey', 'field1', 'value1');
```

### Add to HashSet with TTL
#### `addToHashSetWithTTL`: Add a key-value pair to a HashSet in the cache with a Time-to-Live (TTL).
```javascript
addToHashSetWithTTL('myPrefix', 'myHashSetKey', 'field1', 'value1', 3600); // Cache with a TTL of 1 hour
```

### Get from HashSet
#### `getFromHashSet`: Get the value associated with a field in a HashSet.
```javascript
const value = getFromHashSet('myPrefix', 'myHashSetKey', 'field1');
```

### Get Field Names from HashSet
#### `getFieldNamesFromHashSet`: Get all field names from a HashSet in the cache.
```javascript
const fieldNames = getFieldNamesFromHashSet('myPrefix', 'myHashSetKey');
```

### Get Values from HashSet
#### `getValuesFromHashSet`: Get all values from a HashSet in the cache.
```javascript
const values = getValuesFromHashSet('myPrefix', 'myHashSetKey');
```

### Remove from HashSet
#### `removeFromHashSet`: Remove a field from a HashSet.
```javascript
removeFromHashSet('myPrefix', 'myHashSetKey', 'field1');
```

### Clear HashSet
#### `clearHashSet`: Clear a HashSet in the cache.
```javascript
clearHashSet('myPrefix', 'myHashSetKey');
```

### Get HashSet Size
#### `getHashSetSize`: Get the size (number of fields) of a HashSet in the cache.
```javascript
const size = getHashSetSize('myPrefix', 'myHashSetKey');
```

## Multiple Valued Sets
Certainly! Here's a summary of the provided cache operations with function names and one-liner descriptions:

### Add key-value pairs to the cache without TTL.
#### `madd`: Add an array of key-value pairs to the cache.
```javascript
madd([{ key: 'key1', val: 'value1' }, { key: 'key2', val: 'value2' }]);
```

### Add key-value pairs to the cache with optional TTL.
#### `maddWithTTL`: Add an array of key-value pairs to the cache with an optional Time-to-Live (TTL) for each pair.
```javascript
maddWithTTL([{ key: 'key1', val: 'value1', ttl: 3600 }, { key: 'key2', val: 'value2' }]);
```

### Get the values associated with an array of keys from the cache.
#### `mget`: Retrieve an array of values corresponding to the provided keys from the cache.
```javascript
mget(['key1', 'key2']);
```

### Remove key-value pairs
#### `mremove`: Remove an array of keys and their associated values from the cache.
```javascript
mremove(['key1', 'key2']);
```

### Get the size (number of key-value pairs) in the cache.
#### `mgetSize`: Get the total number of key-value pairs currently stored in the cache.
```javascript
const size = mgetSize();
```

### Check if a key exists in the cache.
#### `misKeyExists`: Check if a specific key exists in the cache.
```javascript
const exists = misKeyExists('key1');
```

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

#### `getCompoundKey`
Generates a compound cache key by combining a prefix and a key.
- `prefix (string)`: The prefix for the cache key.
- `key (string)`: The specific key.
- `{string}`: Return the compound cache key.

#### `checkCacheExpiry`
Checks if a specific key has expired in the cache.
- `prefix (string)`: The prefix for the cache key.
- `key (string)`: The specific key to check for expiration.*
- `{boolean}`: Returns true if the key has expired, otherwise false.

#### `setCacheTTL`
Sets the Time-to-Live (TTL) for a specific key in the cache.
- `prefix (string)`: The prefix for the cache key.
- `key (string)`: The specific key to set TTL for.
- `seconds (number)`: Time-to-Live (TTL) in seconds. Use 0 for no expiration.
- `{boolean}`: Returns true if the TTL was set successfully, otherwise false.

#### `incrementCacheValue`
Increments the value associated with a specific key in the cache by a specified delta.
- `prefix (string)`: The prefix for the cache key.
- `key (string)`: The specific key to increment the value for.
- `delta (number)`: The amount by which to increment the value.
- `{number | undefined}`: The new value associated with the key after incrementing, or undefined if the key was not found.

#### `decrementCacheValue`
Decrements the value associated with a specific key in the cache by a specified delta.
- `prefix (string)`: The prefix for the cache key.
- `key (string)`: The specific key to decrement the value for.
- `delta (number)`: The amount by which to decrement the value.
- `{number | undefined}`: The new value associated with the key after decrementing, or undefined if the key was not found.

#### `getKeysWithPrefix`
Gets an array of cache keys that match a specified prefix pattern.
- `prefix (string)`: The prefix to search for in cache keys.
- `{string[]}`: Returns an array of cache keys matching the specified prefix pattern.

#### `flushCacheWithPrefix`
Flushes all cache entries with a specific prefix.
- `prefix (string)`: The prefix for the cache entries to flush.

#### `getAllCacheKeys`
Gets an array of all cache keys.
- `{string[]}`: Returns An array of all cache keys.

#### `flushAll`
Flushes all cache entries .

## SET
#### `addElementToSet<T>(prefix: string, key: string, element: T): boolean`
Add a single element to a Set within the cache. If the Set does not exist, it will be created.
- `prefix (string)`: A string prefix for the cache key.
- `key (string)`: The key for the Set.
- `element (T)`: The element to add to the Set.
- Returns `boolean`: Returns `true` if the element was added successfully, otherwise `false`.

#### `addElementsToSet<T>(prefix: string, key: string, elements: T[]): boolean`
Add multiple elements to a Set within the cache.
- `prefix (string)`: A string prefix for the cache key.
- `key (string)`: The key for the Set.
- `elements (T[])`: An array of elements to add to the Set.
- Returns `boolean`: Returns `true` if all elements were added successfully, otherwise `false`.

#### `addElementToSetWithTTL<T>(prefix: string, key: string, element: T, seconds: number): boolean`
Add a single element to a Set within the cache with a Time-to-Live (TTL). If the Set does not exist, it will be created.
- `prefix (string)`: A string prefix for the cache key.
- `key (string)`: The key for the Set.
- `element (T)`: The element to add to the Set.
- `seconds (number)`: Time-to-Live (TTL) in seconds. Use `0` for no expiration.
- Returns `boolean`: Returns `true` if the element was added successfully, otherwise `false`.

#### `addElementsToSetWithTTL<T>(prefix: string, key: string, elements: T[], ttl: number): boolean`
Add multiple elements to a Set within the cache with a Time-To-Live (TTL).
- `prefix (string)`: A string prefix for the cache key.
- `key (string)`: The key for the Set.
- `elements (T[])`: An array of elements to add to the Set.
- `ttl (number)`: Time-To-Live (TTL) in seconds for the cached Set.
- Returns `boolean`: Returns `true` if all elements were added successfully, otherwise `false`.

#### `removeElementFromSet<T>(prefix: string, key: string, element: T): boolean`
Remove a specific element from a Set within the cache.
- `prefix (string)`: A string prefix for the cache key.
- `key (string)`: The key for the Set.
- `element (T)`: The element to remove from the Set.
- Returns `boolean`: Returns `true` if the element was successfully removed, otherwise `false`.

#### `removeElementsFromSet<T>(prefix: string, key: string, elements: T[]): boolean`
Remove multiple elements from a Set within the cache.
- `prefix (string)`: A string prefix for the cache key.
- `key (string)`: The key for the Set.
- `elements (T[])`: An array of elements to remove from the Set.
- Returns `boolean`: Returns `true` if all elements were removed successfully, otherwise `false`.

#### `clearSet(prefix: string, key: string): boolean`
Clear (remove) all elements from a Set within the cache.
- `prefix (string)`: A string prefix for the cache key.
- `key (string)`: The key for the Set.
- Returns `boolean`: Returns `true` if the Set was cleared successfully, otherwise `false`.

#### `getAllElementsInSet<T>(prefix: string, key: string): Set<T> | undefined`
Retrieve all elements from a Set within the cache.
- `prefix (string)`: A string prefix for the cache key.
- `key (string)`: The key for the Set.
- Returns `Set<T> | undefined`: The Set containing all elements, or `undefined` if not found.

#### `getSetSize(prefix: string, key: string): number`
Retrieve the size (number of elements) of a Set stored in the cache.
- `prefix (string)`: A string prefix for the cache key.
- `key (string)`: The key for the Set.
- Returns `number`: The size of the Set in the cache.

#### `hasElementInSet<T>(prefix: string, key: string, element: T): boolean`
Check if a specific element exists in a Set within the cache.
- `prefix (string)`: A string prefix for the cache key.
- `key (string)`: The key for the Set.
- `element (T)`: The element to check for existence.
- Returns `boolean`: Returns `true` if the element exists in the Set, otherwise `false`.

#### `unionSets<T>(prefix: string, sourceKeys: string[]): boolean`
Merge two or more sets from different keys into a new set.
- `prefix (string)`: A string prefix for the new cache key.
- `sourceKeys (string[])`: An array of source keys to merge sets from.
- Returns `boolean`: Returns `true` if the merge operation was successful, otherwise `false`.

#### `intersectSets<T>(prefix: string, sourceKeys: string[]): Set<T> | undefined`
Find the common elements between two or more sets.
- `prefix (string)`: A string prefix for the cache keys.
- `sourceKeys (string[])`: An array of source keys to find the intersection of sets.
- Returns `Set<T> | undefined`: The set containing common elements, or `undefined` if not found.

#### `differenceSets<T>(prefix: string, sourceKeyA: string, sourceKeyB: string): Set<T> | undefined`
Find the elements that are in one set but not in another.
- `prefix (string)`: A string prefix for the cache keys.
- `sourceKeyA (string)`: The source key for the first set.
- `sourceKeyB (string)`: The source key for the second set.
- Returns `Set<T> | undefined`: The set containing elements that are in set A but not in set B, or `undefined` if not found.

## HashSet
#### `addToHashSet(prefix: string, key: string, field: string, value: any): boolean`
Add a key-value pair to a HashSet in the cache without Time-to-Live (TTL).
- `prefix (string)`: A string prefix for the cache key.
- `key (string)`: The key for the HashSet.
- `field (string)`: The field name within the HashSet.
- `value (any)`: The value associated with the field.
- Returns `boolean`: Returns `true` if the key-value pair was added successfully, otherwise `false`.

#### `addToHashSetWithTTL(prefix: string, key: string, field: string, value: any, seconds: number): boolean`
Add a key-value pair to a HashSet in the cache with Time-to-Live (TTL).
- `prefix (string)`: A string prefix for the cache key.
- `key (string)`: The key for the HashSet.
- `field (string)`: The field name within the HashSet.
- `value (any)`: The value associated with the field.
- `seconds (number)`: Time-to-Live (TTL) in seconds. Use `0` for no expiration.
- Returns `boolean`: Returns `true` if the key-value pair was added successfully, otherwise `false`.

#### `getFromHashSet(prefix: string, key: string, field: string): any`
Get the value associated with a field in a HashSet.
- `prefix (string)`: A string prefix for the cache key.
- `key (string)`: The key for the HashSet.
- `field (string)`: The field name within the HashSet.
- Returns `any`: The value associated with the field, or `undefined` if not found.

#### `getFieldNamesFromHashSet(prefix: string, key: string): string[]`
Get all field names from a HashSet in the cache.
- `prefix (string)`: A string prefix for the cache key.
- `key (string)`: The key for the HashSet.
- Returns `string[]`: An array of all field names in the HashSet.

#### `getValuesFromHashSet(prefix: string, key: string): any[]`
Get all values from a HashSet in the cache.
- `prefix (string)`: A string prefix for the cache key.
- `key (string)`: The key for the HashSet.
- Returns `any[]`: An array of all values in the HashSet.

#### `removeFromHashSet(prefix: string, key: string, field: string): boolean`
Remove a field from a HashSet.
- `prefix (string)`: A string prefix for the cache key.
- `key (string)`: The key for the HashSet.
- `field (string)`: The field name within the HashSet to remove.
- Returns `boolean`: Returns `true` if the field was removed successfully, otherwise `false`.

#### `clearHashSet(prefix: string, key: string): boolean`
Clear (remove) all fields from a HashSet in the cache.
- `prefix (string)`: A string prefix for the cache key.
- `key (string)`: The key for the HashSet.
- Returns `boolean`: Returns `true` if the HashSet was cleared successfully, otherwise `false`.

#### `getHashSetSize(prefix: string, key: string): number`
Get the size (number of fields) of a HashSet in the cache.
- `prefix (string)`: A string prefix for the cache key.
- `key (string)`: The key for the HashSet.
- Returns `number`: The size (number of fields) of the HashSet.

## Multivalued Sets
#### `madd(items: Array<{ key: string, val: any }>): boolean`
Add key-value pairs to the cache without Time-to-Live (TTL).
- `items (Array<{ key: string, val: any }>)`: An array of objects with key-value pairs to add to the cache.
- Returns `boolean`: Returns `true` if all key-value pairs were added successfully.

#### `maddWithTTL(items: Array<{ key: string, val: any, ttl?: number }>): boolean`
Add key-value pairs to the cache with optional Time-to-Live (TTL).
- `items (Array<{ key: string, val: any, ttl?: number }>)`: An array of objects with key-value pairs to add to the cache. Each object can optionally specify a `ttl` property for Time-to-Live in seconds.
- Returns `boolean`: Returns `true` if all key-value pairs were added successfully.

#### `mget(keys: Array<string>): Array<any>`
Get the values associated with an array of keys from the cache.
- `keys (Array<string>)`: An array of keys to retrieve values from the cache.
- Returns `Array<any>`: An array of values corresponding to the keys.

#### `mremove(keys: Array<string>): boolean`
Remove key-value pairs from the cache.
- `keys (Array<string>)`: An array of keys to remove from the cache.
- Returns `boolean`: Returns `true` if all keys were removed successfully.

#### `mgetSize(): number`
Get the size (number of key-value pairs) in the cache.
- Returns `number`: The size (number of key-value pairs) in the cache.

#### `misKeyExists(key: string): boolean`
Check if a key exists in the cache.
- `key (string)`: The key to check for existence in the cache.
- Returns `boolean`: Returns `true` if the key exists in the cache, otherwise `false`.

## Contributing
Contributions to `npm-cache-it` are welcome! If you'd like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name.`
3. Commit your changes: `git commit -m "Add your feature or fix".`
4. Push your branch to your fork: `git push origin feature/your-feature-name.`
5. Create a pull request on the original repository.

Please follow the Code of Conduct and Contributing Guidelines when contributing.