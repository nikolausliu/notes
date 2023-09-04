# 动态规划

动态规划问题的关键是找到**状态转移方程**，即不同规模的相同问题之间的关系。

寻找状态转移方程的步骤：

1. 找到重叠子问题
2. 找到重叠子问题之间的关系
3. 找到重叠子问题的特殊解

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