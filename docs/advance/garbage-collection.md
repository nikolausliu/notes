# 垃圾回收机制

## 内存的生命周期

1. 分配内存
2. 内存的使用，即读取
3. 释放内存

第2步在所有语言中都是明确的。

而对于第1和第3步，像C这样的低级语言，是需要手动分配内存和释放内存的。而像JavaScript这样的高级语言，分配内存和释放内存都是自动的。

在JavaScript中，**值的声明**和**函数调用**都会导致自动地分配内存。

决定内存何时不再需要了是困难的。低级语言让程序员来决定释放内存的时机，JavaScript让垃圾收集器来决定这个时机，但这也只是一个近似值，因为一块内存何时不再需要是无法确定的。

## 垃圾回收

在内存管理的上下文中，如果一个对象可以访问另一个对象（显式或隐式），那么我们说前者引用了后者。

### 引用计数算法

对象每多一个引用，这个对象的计数加1，每少一个引用，这个对象的计数减1。如果一个对象的计数为0，这个对象占用的内存就被视为“垃圾”，是可以被清除的。

引用计数算法有一个缺陷，当对象存在相互引用的情况下，尽管相互引用的对象不会再继续使用了，其计数仍然至少是1。这就导致相互引用的对象占用的内存无法被垃圾收集器回收，造成内存泄漏。IE6和7就使用引用计数垃圾收集器，现代浏览器没有再使用引用计数收集器的了。

```js
function f() {
  const x = {};
  const y = {};
  x.a = y;        // x references y
  y.a = x;        // y references x

  return 'azerty';
}

f();
```

### 标记清除算法

该算法将“不再需要对象”的定义简化为“无法访问对象”。

该算法假定知道一组称为根的对象。在 JavaScript 中，根是全局对象。定期地，垃圾收集器将从这些根开始，查找从这些根引用的所有对象，然后是从这些根引用的所有对象，依此类推。从根开始，垃圾收集器将因此找到所有可达对象并收集所有不可达对象对象。

再标记清除算法下，循环引用不再是问题了。以上面的代码为例，因为`f()`执行完后，在函数外部就无法从根对象访问到`x`和`y`了。

## 参考

- [Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management#references)
- [garbage collection handbook](https://gchandbook.org/)
- [垃圾回收](https://zh.javascript.info/garbage-collection)
- [「硬核JS」你真的了解垃圾回收机制吗](https://juejin.cn/post/6981588276356317214#heading-20)
- [A tour of V8: Garbage Collection](https://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection)