# JavaScript内存模型

## TL;DR

- ECMAScript规范中并没有规定怎么分配内存，讨论的对象应该具体到不同的实现细节中，比如V8是怎么实现的，下面以V8为例（V8的实现也是在不断修改的）。
- 网上经常能看到的说法“基本类型存储在栈内存上，引用类型存储在堆内存上”是错误的。
- 几乎所有JavaScript值都是在指针访问的堆上分配的，无论它们是对象、数组、字符串还是数字（由于指针标记，小整数除外，即V8 中的`smi`）
- 原始值大部分都是被复用的
- string在V8中被实现为`StringTable`，可以理解为V8把所有用到的字符做了一个隐射的存储，如果把一个字符串赋值给另一个变量，两个相同的字符串变量其实是指向了同一个内存地址。
- 还有一部分原始值在V8中叫做`Oddball`，比如两个对象中都有某个属性值为`true`，这个`true`指向堆内存中相同的`Oddball`地址。

```c
type Null extends Oddball;
type Undefined extends Oddball;
type True extends Oddball;
type False extends Oddball;
type Exception extends Oddball;
type EmptyString extends String;
type Boolean = True|False;
```
- V8中的变量大部分都是指针
- 在 V8 中，64 位架构上从 -2³¹ 到 2³¹-1 的整数（V8 术语是 smi）经过了​​大量优化，因此它们可以直接在指针内部进行编码，而无需为其分配额外的存储空间。而且它不是 V8 或 JavaScript 独有的。 OCaml 和 Ruby 等许多其他语言也这样做。
- 所以`smi`是可以存储在栈上的，比如`const a = 1`。但是`var a = 1`就是在堆上的，因为它作为window的属性存在，而window是在堆上的。

![](https://www.zhenghao.io/art/blog/javascript-memory/overview.png)




## 参考

- [JavaScript Memory Model Demystified](https://www.zhenghao.io/posts/javascript-memory)
- [【译】谈一谈JavaScript的内存模型](https://segmentfault.com/a/1190000023148901)
- [JavaScript中变量存储在堆中还是栈中？——六耳​的回答](https://www.zhihu.com/question/482433315/answer/2083349992)