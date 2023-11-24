# EventEmitter

<CodeGroup>
  <CodeGroupItem title="JavaScript">
  
```js
class EventEmitter {
  handlers
  constructor() {
    this.handlers = new Map()
  }


  on(eventName, cb) {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, [])
    }

    this.handlers.get(eventName).push(cb)
  }

  emit(eventName, ...args) {
    const callbacks = this.handlers.get(eventName)
    if (callbacks) {
      // 这里需要对 this.handlers[eventName] 做一次浅拷贝，主要目的是为了避免通过 once 安装的监听器在移除的过程中出现顺序问题
      const handlers = callbacks.slice()
      handlers.forEach((callback) => {
        callback(...args)
      })
    }
  }


  off(eventName, cb) {
    const callbacks = this.handlers.get(eventName)
    if (callbacks) {
      const index = callbacks.indexOf(cb)
      if (index !== -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  once(eventName, cb) {
    // 对回调函数进行包装，使其执行完毕自动被移除
    const wrapper = (...args) => {
      cb(...args)
      this.off(eventName, wrapper)
    }
    this.on(eventName, wrapper)
  }
}
```

  </CodeGroupItem>
  <CodeGroupItem title="TypeScript">

```ts
class EventEmitter {
  handlers: Map<string, ((...args: unknown[]) => void)[]>
  constructor() {
    this.handlers = new Map<string, ((...args: unknown[]) => void)[]>()
  }

  on(eventName: string, cb: (...args: unknown[]) => void) {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, [])
    }

    this.handlers.get(eventName)!.push(cb)
  }

  emit(eventName: string, ...args: unknown[]) {
    const callbacks = this.handlers.get(eventName)
    if (callbacks) {
      // 这里需要对 this.handlers[eventName] 做一次浅拷贝，主要目的是为了避免通过 once 安装的监听器在移除的过程中出现顺序问题
      const handlers = callbacks.slice()
      handlers.forEach((callback) => {
        callback(...args)
      })
    }
  }

  off(eventName: string, cb: (...args: unknown[]) => void) {
    const callbacks = this.handlers.get(eventName)
    if (callbacks) {
      const index = callbacks.indexOf(cb)
      if (index !== -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  once(eventName: string, cb: (...args: unknown[]) => void) {
    // 对回调函数进行包装，使其执行完毕自动被移除
    const wrapper = (...args: unknown[]) => {
      cb(...args)
      this.off(eventName, wrapper)
    }
    this.on(eventName, wrapper)
  }
}
```

  </CodeGroupItem>
</CodeGroup>

在线演示：

- [JavaScript](https://www.typescriptlang.org/zh/play?noImplicitAny=false&filetype=js#code/MYGwhgzhAECiBuBTAdgF1gWwJatYgTtAN4BQ00AFmMgCYgERnTAD2yEq+ArsKi-gAoAlMSblUFLBAB0VWvXwwAvNGSIA7tACyYAA7CmAXxInybAYiRoAcmAyIANMwBGI0uXJYAZtAEBCCSlZajoGYIgLK1RbeyE3MQ9AmTlQxWkIRFRIlGi7R2gAbQBdIQTjBKTg+TCAc0zsmzyhaV0uCAoBYFcjU2hEbCzLHJj86TGwfBqIeI9mNg5mMBAQZzBgAGtlaEqUhRk6waiR0tnvX2AllbXNmdnoAHp76EBN+MAZxMAAdMBAyMBP7W3JZJCewKQ0a9iK0EAWgqAADlAITWgFFbQDvRoBcWMAMP+AbjlPoA7t0AIW6AejNAFxygDC5QD+CYBZRUAWAmAcfjoGxgIhoIBI7UAoxHYwCLboAaFUAFmqACnVAN+egBM07GUwDQXoBaOUAX4qABudAF4ZgHi9QB3qYAMjIS5FY7FQlEBDGgKguy1WGxkEBAWDpBjumuqaS8-Fgaw6nUuBvWIiUAD5RBbVU7rgIxtIJlMTndDMHyMZwyYmCwvF4Grl7E4urdVfMNXqroadX8grtavUQQnEGHoGdHfrrtNPXc1QssLREAAPbMZ50yes0JsAeTjyZVpZ8Ag7TegfiUKgAtABGFM1n2G9K6E1m4eNpwz-sRjxb8pmZBmwsjJOuavkR7Qb6APbVAMAxgF-FQAOpoBt+MAMhGAUGUmSjAP7ygDdFQDmRs-ABjtQBV60AK8DAAqlQBqiIFBJaw1dR8D0XQCGzP1xkmKt3VPDwulQgN0JLcR-mkGM40PPInHgxCCBLLdCKCcwyMTaBKN0JD8GDYxylgvoMGzNRNAQHJMBwPBBFKfpiOQAQAHJQFNdZpKcYQdQ9dw5nYFh6GkEAWBqGS5I2aTSlDEgJNpRB9OXBSlNdVSmFrTTEG03TLPkgAmIySBMsypNkqzFN8WzqwcrSdL0vz5IAZk87yMGkfocFcwzSiAA)
- [TypeScript](https://www.typescriptlang.org/zh/play?#code/MYGwhgzhAECiBuBTAdgF1gWwJatYgTtAN4BQ00AFmMgCYgEQBc0AsmAA4A8Eq+WyAcwA00ABSiAdFLD4BTaAFdkAa2QB7AO7IA2gF0AlNAC8APmjw1WGvr0my0YGuQ98C4KjX5Rh0uXKoKLAgJKlp6fBgjaGREDVYObl5+YTFJaVl5JVVNHQNjMwsrG10Tb3sAXxIq8idRRCQ0ADkwDERmF2SRYAAjZjSJGTlmLPUtPUNTc0trYntyLAAzMQBCAKCQ6joGDYg6htRm1v0fOb814NCtiIkIRFQ9lAOWxBFx08rT842w7YE7h6az30ywk7AUEAooh6+gq1WgiGw93qj0ObWgHUEIikAwywxUo1yJz8DicPAcYBAIG6YGAyki0C+l3CwT+SP2qJhxMWYmAFKpNLpROJ0AA9CLoIBN+MAM4mAAHTAIGRgE-tBmBC6bZnaZGA1q6aCALQVAABygEJrQCitoB3o0AuLGAGH-ANxycsAd26AELdAPRmgC45QBhcoB-BMAsoqALATAOPx0CcwEQ0EAkdqAUYiHYBFt0ANCqACzVABTqgG-PQAmaQ6-YBoL0AtHKAL8VAA3OgC8MwDxeoA71MAGRmnciOZyoShqhjGcmU6m04IQEBYYNlYV1n7XBaeWA0yFQvkt5QTMy+HtN-m0-qDCCc4XlZfkSrrqr2NQLBYAp6tdpJTEOXpibGLvHZMZ5SaFGbTquk2u85sC+mM+vXVn7jmnbmjm+rZCsS1ZkvwNCIAAHo2r5znSEgQdBADye7QpW0AAUhMHLEYUQALQAIwgcKcHjm27Adl22EiMRGEbn4DEfDUyBdpqB5ohiKQ9H0F64oo+I5OM+RTEUszEmK0AKoAe2qAMAxgC-ioADqaANvxgAyEYAoMrhpagD+8oAboqAOZGqmADHagCr1oAV4GABVKgDVEampxgbWGj4Bw7AEI2C78SMQm3lOGE9O5chrmcKoSDue7saiIiOc5BCBQx-jBbU4XPJFTnsC5+DLpUHz2fCGCNjEcQII8mA4HgXgwgiIXIKIADkoCdsoNUiN4InTmBaj0BIIBqAItX1bSNUwquJCVUGiB9VRjXNZO4kks4HWIF1PUTQ1ABMg0kMNo3VXVk1NWIM1taSC1Lb1u0NQAzBtW0YBICI4CtA0wkAA)

上面包含了一个`EventEmitter`常用的方法，下面的开源实现提供了更多功能：

- [emitter](https://github.com/facebookarchive/emitter)：出自facebook，用JavaScript实现的，代码量不多
- [mitt](https://github.com/developit/mitt/tree/main)：用TypeScript写的，0依赖，源码总共才100多行，去掉类型、注释和空行，真正的源码逻辑才几十行，很适合阅读