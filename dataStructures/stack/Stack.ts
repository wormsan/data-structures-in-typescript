import {LinkedList} from '../linkedList/LinkedList'
import {ListNode} from '../linkedList/ListNode'
export class Stack<T> extends LinkedList<T> {
    // use linked list
    constructor () {
        super()
    }
    // some kind of override
    push (data: ListNode<T> | T) {
        if (!(data instanceof ListNode)) {
            super.push(new ListNode(data))
        } else {
            throw new Error ('the param expects T, not ListNode<T>')
        }
    }
    unshift (node: ListNode<T>) {
        throw new Error('stack cannot unshift')
    }
    shift () {
        throw new Error('stack cannot shift')
    }
    peek () : T {
        return this.tail.data
    }
    // or array
    /*
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
    */
}