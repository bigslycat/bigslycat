import { Worker } from 'worker_threads'

import { WorkerApi, WorkerResponse } from './interfaces.js'
import EventEmitter from 'events'
import { WorkerRequest } from './worker-request.js'

interface EventMap {
  [eventName: string]: [WorkerResponse.Message<string, any, any>]
}

export class Connection<Api extends WorkerApi = {}> {
  private readonly messageEvents = new EventEmitter<EventMap>()

  private count = 0

  get activeRequestsCount() {
    return this.count
  }

  readonly api: Readonly<Api>

  constructor(private worker: Worker) {
    this.worker.on(
      'message',
      (message: WorkerResponse.Message<string, any, any>) =>
        this.messageEvents.emit(
          `${message.name}:${message.requestId}`,
          message,
        ),
    )

    this.api = new Proxy({} as Api, {
      get: (_, name: string) => (payload: any) =>
        this.postMessage(name, payload),
    })
  }

  private postMessage(name: string, payload?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.count += 1

      const request = new WorkerRequest({ name, payload })

      this.messageEvents.once(`${request.name}:${request.id}`, message => {
        if (message.ok) resolve(message.data)
        else reject(message.error)

        this.count -= 1
      })

      this.worker.postMessage(request)
    })
  }
}
