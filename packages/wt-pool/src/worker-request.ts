import { WorkerError } from './worker-error.js'
import { WorkerResult } from './worker-result.js'

export namespace WorkerRequest {
  export interface Options<N extends string, T = undefined> {
    readonly id?: number
    readonly name: N
    readonly payload?: T
  }

  export interface Message<N extends string, T = undefined> {
    readonly id: number
    readonly name: N
    readonly payload?: T
  }
}

export class WorkerRequest<N extends string, T = undefined>
  implements WorkerRequest.Message<N, T>
{
  private static lastRequestId = 0

  readonly id = ++WorkerRequest.lastRequestId
  readonly name: N
  readonly payload!: T

  constructor(options: WorkerRequest.Options<N, T>) {
    this.id =
      typeof options.id === 'number' ?
        options.id
      : ++WorkerRequest.lastRequestId

    this.name = options.name

    if (typeof options.payload !== 'undefined') {
      this.payload = options.payload
    }
  }

  result<R = undefined>(data?: R): WorkerResult<N, R> {
    return new WorkerResult(this, data)
  }

  error<E = undefined>(error?: E): WorkerError<N, E> {
    return new WorkerError(this, error)
  }
}
