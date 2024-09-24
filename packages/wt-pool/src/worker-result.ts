import type { WorkerRequest } from './worker-request.js'

export namespace WorkerResult {
  export interface Message<N extends string, T = undefined> {
    readonly ok: true
    readonly requestId: number
    readonly name: N
    readonly data: T
  }
}

export class WorkerResult<N extends string, T = undefined>
  implements WorkerResult.Message<N, T>
{
  readonly ok = true
  readonly requestId: number
  readonly name: N
  readonly data!: T

  constructor(request: WorkerRequest<N, any>, data?: T) {
    this.requestId = request.id
    this.name = request.name

    if (typeof data !== 'undefined') {
      this.data = data
    }
  }
}
