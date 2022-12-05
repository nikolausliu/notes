# 为axios提供类型约束——记一次axios版本升级

公司有个vue3项目依赖的axios版本为`"axios": "^0.24.0"`。这个版本的一些关键类型声明列举如下：

```ts
export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
  (url: string, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosRequestConfig<D = any> {
  data?: D
  // 其余的字段省略...
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosResponse<T = any, D = any> {
  data: T
  status: number
  statusText: string
  headers: AxiosResponseHeaders
  config: AxiosRequestConfig<D>
  request?: any
}
```

上面的类型声明没有为`AxiosInstance`提供泛型参数用来决定 **请求参数(`AxiosRequestConfig`中的`D`)** 和 **响应数据(`AxiosResponse`中的`T`)** 的类型，他们的类型默认都是any。

举个栗子：比如我有一个获取订单详情的`post`请求`/order`，它可以传递如下参数：

```ts
{
  id?: number
  sn?: string
}
```

请求返回如下数据：

```ts
{
  code: number
  msg: string
  data: {
    id: number
    sn: string
    createTime: number
  }
}
```

实际调用的时候并不能指定请求参数的类型和响应数据的类型，因为 axios 并没有暴露泛型参数：

```
const server = axios.create({
  baseURL: '/api'
})

server({
  url: '/order',
  method: 'post',
  data: {
    // data的类型为any，且不支持通过泛型传入具体类型
  }
}).then(res => {
  // res的类型为AxiosPromise
  // res.data的类型为any，且不支持通过泛型传入具体类型
})
```

# 新版本 axios

时间来到 2022.12.05，目前 axios 的最新版本是 `1.2.0`，我们对比下现在的类型声明。这里只看一下`AxiosInstance`，因为其它几个类型基本没变化或变化不大：

```ts
export interface AxiosInstance extends Axios {
  <T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>
  <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>

  defaults: Omit<AxiosDefaults, 'headers'> & {
    headers: HeadersDefaults & {
      [key: string]: AxiosHeaderValue
    }
  }
}
```

第二行类型声明里，我们可以把泛型`T`和`D`传递给`AxiosResponse<T>`和`AxiosRequestConfig<D>`，这就为开发者提供了**约束请求参数和响应数据类型的能力**。还是上面的例子我们看一下代码实现：

```ts
const server = axios.create({
  baseURL: '/api'
})


type CofData = {
  id?: number
  sn?: string
}
type ResData = {
  code: number
  msg: string
  data: {
    id: number
    sn: string
    createTime: number
  }
}
export function getOrder = (data: ConfData) => {
  return server<ResData, AxiosResponse<ResData, CofData>, CofData>({
    url: '/order',
    method: 'post',
    data,
  })
}

getOrder({
  // 请求参数享受智能提示
  id: 1,
  sn: '123',
}).then((res) => {
  // 响应数据也享受智能提示
  res.data.code // number
  res.data.msg  // string
  res.data.data
  res.data.data.id  // number
  res.data.data.sn  // string
  res.data.data.createTime  // number
})
```

# 升级过程

首先，我记录下老版本的 axios 版本号并备份`pnpm-lock.yaml`，以防升级 axios 版本后出现问题，方便回滚。

然后就是先移除依赖再重装依赖，会自动安装最新版本：

```sh
pnpm remove axios
pnpm add axios
```

把上面的示例代码应用到项目后，就可以一个个API的冲构，小步迭代直至最终完成全部API的重构了