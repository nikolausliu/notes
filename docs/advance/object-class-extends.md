# 对象、类与继承

## 创建对象的几种模式

1. 工厂模式

工厂模式的问题：我们无法区分创建实例的类型。

2. 构造函数模式

new一个对象的过程：

- 在内存中创建一个新对象。
- 这个新对象内部的[[Prototype]]特性被赋值为构造函数的 prototype 属性。
- 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。
- 执行构造函数内部的代码（给新对象添加属性）。
- 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

构造函数模式的问题：构造函数的方法在实例之间不共享。

3. 原型模式

原型模式的问题：属性也会在不同实例间共享。所以通常会把构造模式和原型模式结合起来使用。

## 继承的几种模式

### 原型链继承
1. 每个构造函数都有一个**原型**，构造函数的`prototype`属性和实例的`__proto__`属性都指向原型。
2. 访问实例属性或方法时，如果访问不到，就会去原型上找。
3. 根据前面两点，原型链继承的关键就是把子构造函数的`prototype`指向父实例。

```js
function SuperType() {
  this.colors = ["red", "blue", "green"]
}
function SubType() {}
// 继承 SuperType
SubType.prototype = new SuperType()
SubType.prototype.getSubValue = function() {}
const instance = new SubType()
```

原型链继承的问题：

1. 父实例的引用类型的属性会被子实例继承并且共享。
2. 子类型在实例化时不能给父类型的构造函数传参。

基于上面两点原因，通常不会单独使用原型继承。

### 盗用构造函数继承

```js
function SuperType(name){
  this.name = name
}
function SubType() {
  // 继承 SuperType 并传参
  SuperType.call(this, "Nicholas")
  // 实例属性
  this.age = 29
}
```

盗用构造函数继承解决了原型继承中属性共享和不能给父类型传参的问题。

但是也带来了新问题：

1. 子类必须在构造函数中定义方法。
2. 子类不能访问父类原型上定义的方法。

所以，盗用构造函数继承通常也不会单独使用。

### 组合继承
1. 原型链继承和盗用构造函数继承的优点组合在一起就有了组合继承。
2. 用原型链继承来继承方法。
3. 用盗用构造函数继承来继承属性。

```js
function SuperType(name) {
  this.name = name
}
SuperType.prototype.sayName = function() {
  console.log(this.name)
}
function SubType(name, age){
  // 继承属性
  SuperType.call(this, name)
}
// 继承方法
SubType.prototype = new SuperType()
```

### 原型式继承
1. 原型式继承和原型链继承很相似，不过没有构造函数（只有一个临时的）。
2. `Object.create()`方法将原型式继承的概念规范化了。

```js
function object(o) {
  function F() {}
  F.prototype = o // 临时构造函数
  return new F()
}
```

### 寄生式继承
1. 创建一个实现继承的函数
2. 以某种方式增强对象
3. 返回对象

```js
function createAnother(original){
  let clone = Object.create(original) // 通过调用函数创建一个新对象
  clone.sayHi = function() { // 以某种方式增强这个对象
  console.log("hi")
  }
  return clone // 返回这个对象
}
```

### 寄生式组合继承

组合继承还有额外的问题：

1. 父类构造函数会被调用两次：一次是创建子类原型时，一次是在子构造函数中。
2. 由第1点引发了另一个问题：子类继承的实例属性有两组，一组在子类实例上，一组在子类实例原型上。


```js
function SuperType(name) {
  this.name = name
  this.colors = ["red", "blue", "green"]
}
SuperType.prototype.sayName = function() {
  console.log(this.name)
};
function SubType(name, age){
  SuperType.call(this, name) // 第二次调用 SuperType()
  this.age = age
}
SubType.prototype = new SuperType() // 第一次调用 SuperType()
SubType.prototype.constructor = SubType

const subType = new SubType('s', 20)
console.log(subType.name, subType.colors)  // 's', ['red', 'blue', 'green']
console.log(subType.__proto__.name, subType.__proto__.age)  // undefined, ['red', 'blue', 'green']
```

问题出在下面这行代码上，对父类原型的继承，是通过父类实例来实现的，如果跳过父类实例而直接通过父类原型的副本就能解决这个问题：

```js
SubType.prototype = new SuperType()
// 改成下面这样
SubType.prototype = 克隆(SuperType.prototype)
```

```js
function SuperType(name) {
  this.name = name
  this.colors = ["red", "blue", "green"]
}
SuperType.prototype.sayName = function() {
  console.log(this.name)
};
function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age
}

function inheritPrototype(subType, superType) {
  let prototype = Object.create(superType.prototype) // 创建对象
  prototype.constructor = subType // 增强对象
  subType.prototype = prototype // 赋值对象
}
inheritPrototype(SubType, SuperType)
SubType.prototype.sayAge = function() {
  console.log(this.age)
}
```

一句话：寄生式组合继承就是在组合继承的基础上，从**原型指向父实例**，改为**原型指向父原型的副本**。

多种继承模式里很多都有不同的缺点不能单独使用，但是要弄清楚每个模式的优缺点以及这个模式不断组合进化的过程。

## 类继承

**类声明区别于函数声明的地方：**

1. 函数声明可以提升，类不能。
2. 函数受函数作用域限制，而类受块作用域限制。

**`super`关键字的几个要点：**

> ~~super 只能在派生类构造函数和静态方法中使用。不能单独引用 super 关键字，要么用它调用构造函数，要么用它引用静态方法。~~

这两句引用自《JavaScript高级程序设计（第4版）》，描述中缺少了对父类原型方法的引用情况，许是谬误。

1. `super`不能单独使用，直接调用，相当于调用父类构造函数，且只允许在构造函数中调用。要么作为对象使用，来引用父类的原型方法或静态方法。
2. `super()`中的this指向子实例。`super.实例方法()`中的this指向子实例。`super.静态方法()`中的this指向子类。
3. 如果没有定义类构造函数，在实例化派生类时会调用`super()`，而且会传入所有传给派生类的
参数。
4. 在类构造函数中，不能在调用`super()`之前引用`this`。
5. 如果在派生类中显式定义了构造函数，则要么必须在其中调用`super()`，要么必须在其中返回
一个对象。

> ES6 的继承机制，与 ES5 完全不同。ES5 的继承机制，是先创造一个独立的子类的实例对象，然后再将父类的方法添加到这个对象上面，即“实例在前，继承在后”。ES6 的继承机制，则是先将父类的属性和方法，加到一个空的对象上面，然后再将该对象作为子类的实例，即“继承在前，实例在后”。这就是为什么 ES6 的继承必须先调用super()方法，因为这一步会生成一个继承父类的this对象，没有这一步就无法继承父类。

**类的继承有两条继承链：**

```js
// SubType实例继承SuperType实例
SubType.prototype.__proto__ === SuperType.prototype
// SubType继承SuperType的静态属性
SubType.__proto__ === SuperType
```

