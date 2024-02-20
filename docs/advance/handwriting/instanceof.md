# instanceof

```js
function myInstanceof(left, right) {
  // 判断left是不是对象，需要注意function也是对象
  if ((typeof left !== 'object' && typeof left !== 'function') || left === null) return false
  // 获取left的原型对象
  let proto = Object.getPrototypeOf(left)
  while (true) {
    // 如果left的原型对象是null，说明已经找到了原型链的顶点，return false跳出循环
    if (proto === null) return false
    // 如果left的原型对象与right的prototype属性相等，return true跳出循环
    if (proto === right.prototype) return true
    // 上面两个判断都没走的话，就沿着原型链继续网上找，直到找到原型链的顶点
    proto = Object.getPrototypeOf(proto)
  }
}

myInstanceof('', String)  // false
myInstanceof({}, Object)  // true
myInstanceof({}, Array)  // false
myInstanceof([], Array)  // true
myInstanceof(() => {}, Function)  // true
```

