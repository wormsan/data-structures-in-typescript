import {TreeNode} from './TreeNode'
export type LoopCallback<T> = (data: T | null, index: number) => void
export class BinaryTree<T> {
    root: TreeNode<T> | null = null
    get length () : number {
        let length = 0
        // traverse through root
        this.forEachPreOrder(() => {
            length++
        })
        return length
    }
    get depth () : number {
        let depth = 0
        // traverse by level and return level
        this.forEachByLevel((data, index, level) => {
            depth = level + 1
        })
        return depth
    }
    get width () : number {
        let width = 0
        let largestWidth = 0
        let curLevel = 0
        // traverse each level and get the biggest width
        this.forEachByLevel((data, index, level) => {
            if (curLevel != level) {
                curLevel = level
                width = 1
            } else {
                width++
                if (largestWidth < width) {
                    largestWidth = width
                }
            }
        })
        return largestWidth
    }
    constructor (root: TreeNode<T>) {
        this.root = root
    }
    forEachByLevel (cb: (data: T | null, index: number, level: number) => void) {
        if (this.root == null) return
        let level = 0
        let idx = 0
        let cur: TreeNode<T>[] = [this.root]
        let next: TreeNode<T>[] = []
        function rec () {
            cur.forEach(node => {
                cb(node.data, idx, level)
                idx++
                if (node.leftChild) {
                    next.push(node.leftChild)
                }
                if (node.rightChild) {
                    next.push(node.rightChild)
                }
            })
            cur = []
            if (next.length == 0) return
            if (cur.length == 0) {
                cur = next
                next = []
            }
            level++
            rec()
        }
        rec()
    }
    forEachPreOrder (cb: LoopCallback<T>) {
        let idx = 0
        function rec (node: TreeNode<T>) {
            cb(node.data, idx)
            idx++
            if (node.leftChild) {
                rec(node.leftChild)
            }
            if (node.rightChild) {
                rec(node.rightChild)
            }
        }
        if (this.root != null)
            rec(this.root)
    }
    forEachPostOrder (cb: LoopCallback<T>) {
        let idx = 0
        function rec (node: TreeNode<T>) {
            if (node.leftChild) {
                rec(node.leftChild)
            }
            if (node.rightChild) {
                rec(node.rightChild)
            }
            cb(node.data, idx)
            idx++
        }
        if (this.root != null)
            rec(this.root)
    }
    forEachInOrder (cb: LoopCallback<T>) {
        let idx = 0
        function rec (node: TreeNode<T>) {
            if (node.leftChild) {
                rec(node.leftChild)
            }
            cb(node.data, idx)
            idx++
            if (node.rightChild) {
                rec(node.rightChild)
            }
        }
        if (this.root != null)
            rec(this.root)
    }
    forEach (cb: LoopCallback<T>) {
        this.forEachByLevel((node, index) => cb(node, index))
    }
    remove () {
        this.root = null
    }
}