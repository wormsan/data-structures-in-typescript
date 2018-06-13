class Queue<T> {
    container: T[] = []
    get length () {
        return this.container.length
    }
    push (data: T) {
        this.container.push(data)
    }
    shift () : T | void {
        return this.container.shift()
    }
    peek () : T {
        return this.container[0]
    }
}