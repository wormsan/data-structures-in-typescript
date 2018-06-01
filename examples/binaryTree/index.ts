import {BinaryTree} from '../../dataStructures/binaryTree/BinaryTree'
import {TreeNode} from '../../dataStructures/binaryTree/TreeNode'

const root = new TreeNode(1)

const a = root.insertLeft(new TreeNode(3))
const aa = a.insertLeft(new TreeNode(11))
aa.insertLeft(new TreeNode(4))
aa.insertRight(new TreeNode(33))
a.insertRight(new TreeNode(12))
 .insertLeft(new TreeNode(7))

const b = root.insertRight(new TreeNode(5))
b.insertLeft(new TreeNode(19))
b.insertRight(new TreeNode(2))

const tree = new BinaryTree(root)

tree.forEachByLevel((data, idx, level) => {
    console.log(data, idx, level)
})

console.log(tree.width)
console.log(tree.depth)
console.log(tree.length)

