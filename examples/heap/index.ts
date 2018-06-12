import {Heap} from "../../dataStructures/heap/Heap"

const heap = new Heap()


heap.insert(10)
heap.insert(5)
heap.insert(7)
heap.insert(9)
heap.insert(14)
heap.insert(1)
heap.insert(13)

console.log(heap.getData())

const heap2 = new Heap('small')

heap2.insert(10)
heap2.insert(5)
heap2.insert(7)
heap2.insert(9)
heap2.insert(14)
heap2.insert(1)
heap2.insert(13)

console.log(heap2.getData())

console.log(heap.extract())
console.log(heap.getData())