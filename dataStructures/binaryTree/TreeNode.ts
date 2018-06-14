export class TreeNode<T> {
    leftChild: TreeNode<T> | null = null
    rightChild: TreeNode<T> | null = null
    parent: TreeNode<T> | null = null
    data: T | null = null
    constructor (data?: T) {
        if (data)
            this.data = data
    }
    insertLeft (node: TreeNode<T>) : TreeNode<T> {
        this.leftChild = node
        if (node)
            node.parent = this
        return node
    }
    insertRight (node: TreeNode<T>) : TreeNode<T>{
        this.rightChild = node
        if (node)
            node.parent = this
        return node
    }
    removeLeft () : TreeNode<T> | null {
        const temp = this.leftChild
        if (!temp) return null
        temp.parent = null
        this.leftChild = null
        return temp
    }
    removeRight () : TreeNode<T> | null {
        const temp = this.rightChild
        if (!temp) return null
        temp.parent = null
        this.rightChild = null
        return temp
    }
    replaceBy (node: TreeNode<T>) {
        this.leftChild = node.leftChild
        this.rightChild = node.leftChild
        this.data = node.data
        // this.parent is still this.parent
    }
}