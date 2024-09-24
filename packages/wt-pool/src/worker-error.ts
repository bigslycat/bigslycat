import type { WorkerRequest } from './worker-request.js'

export namespace WorkerError {
  export interface Message<N extends string, T = undefined> {
    readonly ok: false
    readonly requestId: number
    readonly name: N
    readonly error: T
  }
}

export class WorkerError<N extends string, T = undefined>
  implements WorkerError.Message<N, T>
{
  readonly ok = false
  readonly requestId: number
  readonly name: N
  readonly error!: T

  constructor(request: WorkerRequest<N, any>, error?: T) {
    this.requestId = request.id
    this.name = request.name

    if (typeof error !== 'undefined') {
      this.error = error
    }
  }
}
