import {ListNode} from './ListNode'
export class LinkedList<T> {
    protected head: ListNode<T> | null = null
    protected tail: ListNode<T> | null = null
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
            if (!this.head) {
                this.head = node
                this.tail = node
            } else if (this.tail) {
                this.tail.setNext(node)
                this.tail = node
            }
        } else {
            this.push(new ListNode(node))
        }
    }
    pop () : ListNode<T> | void {
        if (this.tail) {
            const newTail = this.tail.prev
            if (newTail && newTail.prev) {
                const returnNode = newTail.prev.removeNext()
                this.tail = newTail
                return returnNode
            }
        }
    }
    unshift (node: ListNode<T> | T) {
        if (node instanceof ListNode) {
            if (!this.head) {
                this.head = node
                this.tail = node
            } else {
                this.head.setPrev(node)
                this.head = node
            }
        } else {
            this.unshift(new ListNode(node))
        }
    }
    shift () : ListNode<T> | void {
        if (this.head) {
            const newHead = this.head.next
            if (newHead && newHead.next) {
                const returnNode = newHead.next.removeBefore()
                this.head = newHead
                return returnNode
            }
        }
    }
}