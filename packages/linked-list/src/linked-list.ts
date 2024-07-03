import { isSafeArrayIndex } from './is-safe-array-index.js'
import { LinkedListItem } from './linked-list-item.js'

export class LinkedList<T> implements Iterable<T>, ArrayLike<T> {
  readonly [index: number]: T

  private first?: LinkedListItem<T>
  private last?: LinkedListItem<T>

  constructor(values?: Iterable<T>) {
    if (values) {
      for (const value of values) {
        this.push(value)
      }
    }

    const proxy = new Proxy(this, {
      get: (target, propKey, receiver) => {
        if (typeof propKey === 'string' && isSafeArrayIndex(propKey)) {
          return target.at(+propKey)
        }

        return Reflect.get(target, propKey, receiver)
      },
    })

    return proxy
  }

  get length(): number {
    return this.last ? this.last.index + 1 : 0
  }

  *[Symbol.iterator](): Iterator<T> {
    let current = this.first

    while (current) {
      yield current.value
      current = current.next
    }
  }

  at(index: number): undefined | T {
    if (index < 0 || index > Number.MAX_SAFE_INTEGER || !this.first) {
      return
    }

    let current: undefined | LinkedListItem<T> = this.first

    for (let i = 0; i < index; i += 1) {
      if (!current) return
      current = current.next
    }

    return current?.value
  }

  push(value: T) {
    const item = new LinkedListItem(value)

    if (this.last) {
      item.previous = this.last
      this.last.next = item
    } else {
      this.first = item
    }

    this.last = item
  }

  pop(): undefined | T {
    if (!this.last) return
    const { value } = this.last
    this.last = this.last.previous
    if (this.last) delete this.last.next
    return value
  }

  unshift(value: T) {
    const item = new LinkedListItem(value)

    if (this.first) {
      item.next = this.first
      this.first.previous = item
    } else {
      this.last = item
    }

    this.first = item
  }

  shift(): undefined | T {
    if (!this.first) return
    const { value } = this.first
    this.first = this.first.next
    if (this.first) delete this.first.previous
    return value
  }

  toArray(): T[] {
    return Array.from(this)
  }
}
