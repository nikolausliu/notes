# 防抖与节流

- 防抖：事件停止触发一段时间后执行回调。
- 节流：事件触发过程中不断执行回调，但是稀释回调的频率。

防抖有点像电梯关门，假设电梯检测5秒内没有人进入就会关门，如果在第3秒小明进了电梯，则需要在第3秒时重新计时5秒内没有人进入才会关门。

节流有点像游戏里的攻击，你可以快速连续的点击攻击键，但是攻击动作只会按照固有的攻击速度执行。


## 防抖

应用场景：

- 窗口resize重新渲染渲染echarts（resize的过程属于中间状态，渲染状态不需要关心，所以应该用防抖）
- 连续重复提交表单（这个用防抖的话也行，那就是最后一次点击会发送请求，不过用一个布尔值的变量锁配合loading来处理更合适）

```ts
function debounce<T extends (args: unknown[]) => void>(fn: T, wait: number) {
  let timeout: number

  return function () {
    const context = this
    const args = arguments

    clearTimeout(timeout)
    timeout = setTimeout(function () {
      fn.apply(context, args)
    }, wait)
  }
}
```

[在线演示](https://play.vuejs.org/#eNp9U01v2zAM/SuELnVQw0naW5AE2IYetsM2bLlNO7g27aiVKEMfSYvA/720HKc5FAWC2OQj+R4/fBJfuq44RBQrsfaVU10AjyF2oEtqN1IEL8VWkjKddQFO4LCBHhpnDdxw2o0kSU2kKihLUOOj5Xdc7wBfAlLtIStd61cQ6Znskf79n8FmCwer6m3W0Ap2ORxLFVZA0Tyim8FJEoDGAEEZtPGCDDzA7CE6ggthdk4AqCz5MPwHZoYNhL3y18ggg938iAaJu0r1GNVYut3IlZ05ZyN0tjiLJzKFfEAN0FBRdp1+zc78eaI7l+nHFpPVS+KfpFGT8S0X54lmS0aPimp7LCwZGz0ae0AGp4lmGabJJcoh22ostG0zzFOrqTrXKw6ljnh7yzw5LBeLBQPr+bhYXiMbAU2ny4BsAaz3y+1laXM2Rufd9nRK6vqevXfsXc+v8kTOZ8EiGtUWT94S307SJUVlTac0ul/dMCM+ndU0JClKre3xR/IFFzGf/NUeq+cP/E/+ZfBJ8duhR3dAKS5Y4PliGOGHvz955FegsXXUHP0J+Ad5gHHQOIZ9jVSz7Ku4pPZ7unpF7c4/DPfsp6YGoWmfKV4K/hK+fdL6u9z74n66A9G/AdKQKoo=)

## 节流

应用场景：

- 页面滚动时，埋点发送请求（因为需要稀释发送请求的频率，所以适合用节流，用防抖的话就变成滚动停止才发送一次请求了）
- 搜索框搜索联想功能（这个看具体的业务需求，我在谷歌试了下基本每个字母都会触发一次请求，但如果要用的话肯定是节流比防抖合适，因为用防抖就变成了停止输入才会发送请求了）

```ts
function throttle<T extends (args: unknown[]) => void>(fn: T, wait) {
  let previous = 0
  return function () {
    let now = +new Date()
    const context = this
    const args = arguments
    if (now - previous > wait) {
      fn.apply(context, args)
      previous = now
    }
  }
}
```

[在线演示](https://play.vuejs.org/#eNp9U02PmzAQ/SsjX5ZVKEl2bxFB6sce2kNbtbnVPVAYiHfNGNkGtory3zs2yS6HahHC8ps3M28+OIn3fZ+NA4qdyF1lVe/BoR960CW1eym8k6KQpLreWA8nsNjAGRprOrhhtxtJkpqBKq8MgT9a473G/AD47JFqB0lpW7eDgZ7ITPTr9y3sCxiNqoukoR0cUphK5W/hJAlAo4fe4qjM4GAPm4BZVmMJXnIkF+7M5qBMXBFO8Kn0mNzOpsqQ8+HrWQcT/FG5pSWIYpiPoUPiGqNNNZCEgO9eRRRLeeFpKCv7Xv9NLsHTGOuSFpbqOdKMnsPBH34lzfk71zKDe5ls2XVSVJspM9SxJ3ZmxCh57mWSYOxZVBC8jcZMmzbBNJYVU3O8bCz1gKsV50lhu9ls2JCv55HyAPnises1N4lvAPlxW9T4x3BbMV/zZQbvitMpqjufGb1jNF8v/ETKC8EiGtVmj84Qb03UJUVlul5ptN/6MCVemt21Z1KUWpvpS8S8HTC94tURq6f/4I/uOWBSfLfo0I4oxYvNc7vRz+aHn195AgtjZ+pBM/sN4w/kBg5B40z7MFDNshe8qPZz3HdF7cE9hE1216KC0DjPyJeC/4GPb5T+Kvc+u7/ugTj/A9DKJLI=)


## 参考

- [JavaScript专题之跟着underscore学防抖](https://github.com/mqyqingfeng/Blog/issues/22)
- [JavaScript专题之跟着underscore学节流](https://github.com/mqyqingfeng/Blog/issues/26)