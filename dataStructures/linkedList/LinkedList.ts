import {ListNode} from './ListNode'
export class LinkedList<T> {
    head: ListNode<T> | null = null
    tail: ListNode<T> | null = null
    isEmpty () {
      return this.head ? true : false
    }
    forEach (cb: (data: T, index: number) => void) {
        this.traverse((node, idx) => {
          if (node.data !== undefined)
            cb(node.data, idx)
        })
    }
    traverse (cb: (node: ListNode<T>, index: number) => void) {
      let index = 0
        function traverse (node: ListNode<T> | null) {
            if (node != null) {
                cb(node, index)
                index++
                traverse(node.next)
            }
        }
        traverse(this.head)
    }
    getLength () {
      let l = 0
      this.traverse((_, idx) => {l = idx + 1})
      return l
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