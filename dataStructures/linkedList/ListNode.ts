import {LinkedList} from './LinkedList'
export class ListNode<T> {
    private list: LinkedList<T>
    next: ListNode<T> = null
    prev: ListNode<T> = null
    data: T = null
    constructor (data: T) {
        this.data = data
    }
    bindList (list: LinkedList<T>) {
        if (this.list && this.list !== list) {
            throw new Error("名花有主啦")
        } else {
            this.list = list
        }
    }
    unbindList () {
        this.list = null
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
        this.list.length++
    }
    setPrev (node: ListNode<T>) {
        if (this.prev === null) {
            this.prev = node
            node.next = this
        } else {
            const temp = this.prev
        }
        this.list.length++
    }
    removeNext () : ListNode<T> {
        const temp = this.next
        if (!temp) return
        if (temp.next !== null) {
            this.next = temp.next
            temp.next.prev = this.next
        } else {
            this.next = null
            temp.prev = null
        }
        if (this.list) {
            this.list.length--
            this.unbindList()
        }
        return temp
    }
    removeBefore () : ListNode<T> {
        const temp = this.prev
        if (!temp) return
        if (temp.prev !== null) {
            this.prev = temp.prev
            temp.prev.next = this.next
        } else {
            this.prev = null
            temp.next = null
        }
        if (this.list) {
            this.list.length--
            this.unbindList()
        }
        return temp
    }
}