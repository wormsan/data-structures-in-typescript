import {ListNode} from './ListNode'
export class LinkedList<T> {
    private head: ListNode<T>
    private tail: ListNode<T>
    length: number = 0
    forEach (cb: (data: any, index: number) => void) {
        let index = 0
        function traverse (node: ListNode<T> | null) {
            if (node != null) {
                cb(node.data, index)
                index++
                traverse(node.next)
            }
        }
        traverse(this.head)
    }
    push (node: ListNode<T>) {
        node.bindList(this)
        if (!this.head) {
            this.head = node
            this.tail = node
            this.length++
        } else {
            this.tail.setNext(node)
            this.tail = node
        }
    }
    pop () {
        this.tail.prev.removeNext()
    }
    unshift (node: ListNode<T>) {
        node.bindList(this)
        if (!this.head) {
            this.head = node
            this.tail = node
            this.length++
        } else {
            this.head.setPrev(node)
            this.head = node
        }
    }
    shift () {
        this.tail.prev.removeBefore()
    }
}