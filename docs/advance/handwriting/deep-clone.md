# 深拷贝

```js
function deepClone(value) {
    const cache = new WeakMap()
    function _deepClone(value) {
        if (value === null || typeof value !== 'object') {
            return value
        }
        if (cache.has(value)) {
            return cache.get(value)
        }
        const result = Array.isArray(value) ? [] : {}
        cache.set(value, result)
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                result[key] = _deepClone(value[key])
            }
        }
        return result
    }
    return _deepClone(value)
}
```