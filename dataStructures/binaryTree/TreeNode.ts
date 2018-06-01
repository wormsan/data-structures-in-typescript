export class TreeNode<T> {
    leftChild: TreeNode<T> = null
    rightChild: TreeNode<T> = null
    parent: TreeNode<T> = null
    data: T = null
    constructor (data?: T) {
        this.data = data
    }
    insertLeft (node: TreeNode<T>) : TreeNode<T> {
        this.leftChild = node
        node.parent = this
        return node
    }
    insertRight (node: TreeNode<T>) : TreeNode<T> {
        this.rightChild = node
        node.parent = this
        return node
    }
    removeLeft () : TreeNode<T> {
        const temp = this.leftChild
        this.leftChild.parent = null
        this.leftChild = null
        return temp
    }
    removeRight () : TreeNode<T> {
        const temp = this.rightChild
        this.rightChild.parent = null
        this.rightChild = null
        return temp
    }
}