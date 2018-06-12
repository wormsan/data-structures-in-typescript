import {ListNode} from '../../dataStructures/linkedList/ListNode'
import {LinkedList} from '../../dataStructures/linkedList/LinkedList'

const head = new ListNode<string>("cao")

const sec = new ListNode<string>("ni")

const third = new ListNode<string>("ma")


const list = new LinkedList()

list.push(head)
list.push(sec)
list.push(third)

// sec.removeNext()

console.log(list.length)

list.forEach((data, index) => {
    console.log(data , index)
})

list.pop()
