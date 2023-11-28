# 创建型：单例模式

保证一个类仅有一个实例，并提供一个访问它的全局访问点，这样的模式就叫做单例模式。

要做到仅有一个实例，**关键是要判断是否已经存在实例，没有则创建，有则直接返回已创建的实例**。

## 实现

通常我们会通过**静态方法**来完成：

```ts
class Singleton {
  // 用静态属性保存实例
  private static instance: Singleton

  // 加上private关键字，通过`new Singleton()`调用就会报错
  private constructor() {}

  static getInstance() {
    // 如果实例不存在，则创建实例
    if (!Singleton.instance) {
      Singleton.instance = new Singleton()
    }
    // 如果已经存在实例，则返回该实例
    return Singleton.instance
  }
  
}
const s1 = Singleton.getInstance()
const s2 = Singleton.getInstance()
console.log(s1 === s2)  // true
new Singleton() // 编译器报错
```
[playground](https://www.typescriptlang.org/zh/play?#code/MYGwhgzhAEDKCWA7A5iApgFwPaOgbwChpoB6E6QCldBNdMEADQPR1ByA0F35QDW1A87UGj5I6ABwCd4ANzAY00CBhHxg0JBLCJgaAFxwkqTDgLcy0QAVKgKDl+QkWkDOioDpUwOragGH-AWAmBx+IAGiNAHc1KdNkQAKAJROgMAxFICMOoBY8oClRoCYqdzGwqLQwDgSfACuwNh8AfgAvtrE8hjS0MiYAJKI8opoOYTExLqAQZqAOeacgLByLIAU6jaAmEqA2EqAX3qc3MTwAGbQvgCECF6aiAB0cpI1-vijDXMaPstVq0rQALzQrh7b3jgBm-kNpOStgE+6gPN+3Zx9gCvxgHtqgKfRI3d8TBpPi4C4LPbVJTcW7QAj5ZL7cQARmOnh2OEWZQwlUhtX8BAREnEACZUWDdlicQc8QSUlh0IsQFhkL4ICijhySet7tAMOk0AQzmjLn51rpAGj+gEXowAWajEgA)

注意`private constructor()`，加了`private`关键字后，尝试调用`new Singleton()`时TS编译器会报错，当然了这只是编译时的，构建后的运行时依然能够运行。

我们还可以通过**闭包**来实现，这里一开始尝试用TypeScript来写感觉很别扭，所以直接用JavaScript来实现了：

```js
function Singleton() {}
Singleton.getInstance = (function () {
  let instance = null
  return function () {
    if (!instance) {
      instance = new Singleton()
    }
    return instance
  }
})()
const s1 = Singleton.getInstance()
const s2 = Singleton.getInstance()
console.log(s1 === s2)
```

[playground](https://www.typescriptlang.org/zh/play?noImplicitAny=false&filetype=js#code/GYVwdgxgLglg9mABAZRmA5gGwKZQQCgEpEBvAXwChUMc8wA6dXASTAGcoBDSbRAXkT5QkWAkHESFRIlqI0HbhF4CwITJimIATrhBakw6PCRFSm6TGCCAhPK48J56XPb2l-RGGwB3FGiy4BIROlM7auvouCjyalGSERBQQCByIbACMHtQBdIwsrorYicmuaQBMWf60CHlQrNFKxSlwOPSYcOj4Gfx8AmxlhEA)

## Vuex中的“单例模式”
Vuex使用**单一状态树**，我们在使用Vuex的时候通常也只会实例化一个Store，然而Vuex中的Store是一个“假单例”。

下面是Store类的部分源码：

```js
class Store {
  constructor (options = {}) {
    // ...
    this._actions = Object.create(null)
    this._mutations = Object.create(null)
    this._wrappedGetters = Object.create(null)
    this._modulesNamespaceMap = Object.create(null)
    this._subscribers = []
    this._watcherVM = new Vue()

    // 将 this 赋值给 store，这是为了在后续的函数中使用 Store 实例的上下文
    const store = this
    // 将 this 中的 dispatch 和 commit 方法解构出来，以便在后续的函数中使用
    const { dispatch, commit } = this
    // 分别为 dispatch 和 commit 方法绑定上下文
    this.dispatch = function boundDispatch (type, payload) {
      return dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit (type, payload, options) {
      return commit.call(store, type, payload, options)
    }
    // ...
  }
}
```
在源码的`constructor`中**找不到任何关于是否已创建实例然后返回的逻辑**。如果尝试实例化两个实例判断，会发现两个实例也确实不相等：

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建一个 store 对象 1 号
const store1 = new Vuex.Store({
  state: { count: 0 },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})

// 创建一个 store 对象 2 号
const store2 = new Vuex.Store({
  state: { count: 0 },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})

// false，说明 store1 和 store2 是完全不同的两个 store
console.log(store1 === store2)
```

既然Store并没有实现单例模式，那它是怎么表现出单例般的行为的呢？

Store 并没有实现标准的单例模式，但是却能够表现出一种类似于单例的行为。这是因为 **Vuex 从整体设计的层面来保证了 Store 在同一个 Vue 应用中的唯一性**。

具体来说，我们首先需要关注的是`Vue.use()`方法，这个方法允许我们给`Vue`应用安装像`Vuex`这样的插件。`Vuex`插件是一个对象，它在内部实现了一个`install`方法，这个方法会在插件安装时被调用，从而把`Store`注入到`Vue`应用里去。也就是说每`install`一次，`Vuex`都会尝试给`Vue`应用注入一个`Store`。

在`install`函数源码中，有一段和我们楼上的`getInstance()`非常相似的逻辑：

```js
let Vue // 这个Vue的作用和楼上的instance作用一样
...

export function install (_Vue) {
  // 判断传入的Vue实例对象是否已经被install过Vuex插件（是否有了唯一的 store）
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  // 若没有，则为这个Vue实例对象install一个唯一的Vuex
  Vue = _Vue
  // 将Vuex的初始化逻辑写进Vue的钩子函数里
  applyMixin(Vue)
}

```

**这段和`getInstance()`非常相似的逻辑，通过判断当前`Vue`应用是否已经安装过`Vuex`插件，保证了在同一个`Vue`应用中只存在一个`Vuex`实例。**

继续往下看，在`install`函数中，我们可以看到`Vue`实例被赋值为`_Vue`，接着作为`applyMixin(Vue)`函数的参数触发一次`applyMixin()`的调用。`applyMixin()`函数会在`Vue`实例的`beforeCreate`生命周期钩子中，将`Store`实例挂载到`Vue`实例上。这个“挂载”动作对应的是如下所示的`vuexInit()`函数:

```js
function vuexInit () {
  const options = this.$options
  // 将 store 实例挂载到 Vue 实例上
  if (options.store) {
    this.$store = typeof options.store === 'function'
      ? options.store()
      : options.store
  } else if (options.parent && options.parent.$store) {
    this.$store = options.parent.$store
  }
}
```

这段代码中最值得我们注意的，是`else if`这一行的判断：如果当前组件实例的配置对象中不存在`store`，但存在父组件实例`（options.parent）`且父组件实例具有`$store`属性，那么将父组件实例的`$store`赋值给当前组件实例的`$store`。
这段逻辑意味着，`$store`实例在`Vue`组件树中是被层层继承下来的——当子组件自身不具备`$store`时，会查找父组件的`$store`并继承。这样，整个`Vue`组件树中的所有组件都会访问到同一个`Store`实例——那就是根组件的`Store`实例。

也就是说，`vuexInit()`的主要作用是将根组件的`Store`实例注入到子组件中，这样所有子组件都可以通过`this.$store`访问到同一个`Store`实例。**这就确保了`Vuex Store`在整个`Vue`应用中的唯一性。**

总结一下：`install()`函数通过拦截`Vue.use(Vuex)`的多次调用，**保证了在同一个`Vue应`用只会安装唯一的一个`Vuex`实例；**而`vuexInit()`函数则**保证了同一个`Vue`应用只会被挂载唯一一个`Store`。**这样一来，从效果上来看，`Vuex `确实是创造了两个“单例”出来。

不过需要额外注意一下：只有**在同一个`Vue`应用中**`Store`才具有上面所说的唯一性。而在同一个页面中，我们可以使用多个`Vue`应用，每个`Vue`应用都可以拥有自己的`Store`实例。

## 单例模式实现一个Modal

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>单例模式弹框</title>
</head>
<style>
    #modal {
        height: 200px;
        width: 200px;
        line-height: 200px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid black;
        text-align: center;
    }
</style>
<body>
	<button id='open'>打开弹框</button>
	<button id='close'>关闭弹框</button>
</body>
<script>
    // 核心逻辑，这里采用了闭包思路来实现单例模式
    const Modal = (function() {
    	let modal = null
    	return function() {
            if(!modal) {
            	modal = document.createElement('div')
            	modal.innerHTML = '我是一个全局唯一的Modal'
            	modal.id = 'modal'
            	modal.style.display = 'none'
            	document.body.appendChild(modal)
            }
            return modal
    	}
    })()
    
    // 点击打开按钮展示模态框
    document.getElementById('open').addEventListener('click', function() {
        // 未点击则不创建modal实例，避免不必要的内存占用;此处不用 new Modal 的形式调用也可以，和 Storage 同理
    	const modal = new Modal()
    	modal.style.display = 'block'
    })
    
    // 点击关闭按钮隐藏模态框
    document.getElementById('close').addEventListener('click', function() {
    	const modal = new Modal()
    	if(modal) {
    	    modal.style.display = 'none'
    	}
    })
</script>
</html>
```