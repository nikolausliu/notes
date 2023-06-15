# 动态规划

## 斐波那契数列(leetcode 509)

1. 状态转移方程

```
dp(n) = dp(n - 1) + dp(n - 2)
```

2. 特殊解

```
dp(0) = 0
dp(1) = 1
```

### 递归解法

```js
function fibonacci(n) {
  if (n < 2) {
    return n
  }
  return fibonacci(n - 1) + fibonacci(n - 2)
}
```

### 滑动数组

```js
function fibonacci(n) {
  if (n < 2) {
    return n
  }
  let prev = 0
  let cur = 0
  let result = 1
  for (let i = 2; i <= n; i++) {
    prev = cur
    cur = result
    result = prev + cur
  }
  return result
}
```