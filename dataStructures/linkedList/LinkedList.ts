import {ListNode} from './ListNode'
export class LinkedList<T> {
    protected head: ListNode<T>
    protected tail: ListNode<T>
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
    push (node: ListNode<T> | T) {
        if (node instanceof ListNode) {
            node.bindList(this)
            if (!this.head) {
                this.head = node
                this.tail = node
                this.length++
            } else {
                this.tail.setNext(node)
                this.tail = node
            }
        } else {
            throw new Error('the param expects LinkstNode<T> not T')
        }
    }
    pop () {
        const tail = this.tail.prev
        this.tail.prev.removeNext()
        this.tail = tail
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
        const head = this.head.next
        this.head.next.removeBefore()
        this.head = head
    }
}