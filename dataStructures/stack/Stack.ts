class Stack<T> {
    container: T[] = []
    get length () {
        return this.container.length
    }
    push (data: T) {
        this.container.push(data)
    }
    pop () : T {
        return this.container.pop()
    }
    peek () : T {
        return this.container[0]
    }
}