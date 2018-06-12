import {Stack} from '../../dataStructures/stack/Stack'



var stack = new Stack()

stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)
console.log(stack.peek())

stack.pop()

console.log(stack.peek())
