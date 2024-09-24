import { isMainThread, parentPort, type Worker } from 'worker_threads'

import { Connection } from './connection.js'
import { WorkerRequest } from './worker-request.js'
import { WorkerApi } from './interfaces.js'

export namespace WorkerPool {
  export interface Options<Api extends WorkerApi = {}> {
    getWorkers(): readonly Worker[]
    readonly api: Api
  }
}

export class WorkerPool<Api extends WorkerApi = {}> {
  private readonly connections?: Connection<Api>[]
  private readonly handlers: Readonly<Api>

  readonly api: Readonly<Api>

  constructor(options: WorkerPool.Options<Api>) {
    if (isMainThread) {
      const workers = options.getWorkers()
      if (!workers.length) throw new Error('')
      this.connections = workers.map(worker => new Connection<Api>(worker))
    } else {
      parentPort?.on('message', message => this.handleMessage(message))
    }

    this.handlers = options.api

    this.api = Object.keys(options.api).reduce<
      Record<string, (payload: any) => Promise<any>>
    >((acc, methodName) => {
      acc[methodName] = payload => this.postMessage(methodName, payload)
      return acc
    }, {}) as any
  }

  private postMessage(name: string, payload: any): Promise<any> {
    if (!isMainThread) throw new Error('')

    const connection = this.connections!.reduce((left, right) =>
      right.activeRequestsCount > left.activeRequestsCount ? right : left,
    )

    return connection.api[name]!(payload)
  }

  private async handleMessage(message: unknown) {
    if (
      !message ||
      typeof message !== 'object' ||
      !isHaveId(message) ||
      !isHaveName(message)
    ) {
      return
    }

    const handle = this.handlers[message.name]

    if (!handle) return

    const request = new WorkerRequest<string, any>(message)
    const result = await handle(request.payload)

    parentPort?.postMessage(request.result(result))
  }
}

function isHaveId<T extends object>(obj: T): obj is T & Record<'id', number> {
  return typeof (obj as any).id === 'number'
}

function isHaveName<T extends object>(
  obj: T,
): obj is T & Record<'name', string> {
  return typeof (obj as any).name === 'string'
}
