import {LinkedList} from './LinkedList'
export class ListNode<T> {
    next: ListNode<T> | null = null
    prev: ListNode<T> | null = null
    data: T | null = null
    constructor (data: T) {
        this.data = data
    }
    setNext (node: ListNode<T>) {
        if (this.next === null) {
            this.next = node
            node.prev = this
        } else {
            const temp = this.next
            this.next = node
            node.prev = this
            node.next = temp
            temp.prev = node
        }
    }
    setPrev (node: ListNode<T>) {
        if (this.prev === null) {
            this.prev = node
            node.next = this
        } else {
            const temp = this.prev
        }
    }
    removeNext () : ListNode<T> | void {
        const temp = this.next
        if (!temp) return
        if (temp.next !== null) {
            this.next = temp.next
            temp.next.prev = this.next
        } else {
            this.next = null
            temp.prev = null
        }
        return temp
    }
    removeBefore () : ListNode<T> | void {
        const temp = this.prev
        if (!temp) return
        if (temp.prev !== null) {
            this.prev = temp.prev
            temp.prev.next = this.next
        } else {
            this.prev = null
            temp.next = null
        }
        return temp
    }
}