export class LinkedListItem<T> {
  constructor(
    readonly value: T,
    public previous?: LinkedListItem<T>,
    public next?: LinkedListItem<T>,
  ) {}

  get index() {
    let index = 0
    let { previous } = this

    while (previous) {
      index += 1
      previous = previous.previous
    }

    return index
  }
}
