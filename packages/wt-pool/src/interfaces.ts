import { WorkerError } from './worker-error.js'
import { WorkerResult } from './worker-result.js'

export interface WorkerApi {
  [methodName: string]: (payload: any) => Promise<any>
}

export namespace WorkerResponse {
  export type Message<N extends string, T = undefined, E = undefined> =
    | WorkerResult.Message<N, T>
    | WorkerError.Message<N, E>
}
