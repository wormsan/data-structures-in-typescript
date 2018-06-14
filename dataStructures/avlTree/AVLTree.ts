import {LoopCallback, BinaryTree} from '../binaryTree/BinaryTree'
import {TreeNode} from '../binaryTree/TreeNode'

export enum AVLBalance {
    BALANCED = 0,
    LEFT_HEAVY = 1,
    RIGHT_HEIAVY = -1,
}
export type Compare<T> = (v1: T | null, v2: T | null) => number
export class AVLNode<T> extends TreeNode<T> {
    leftChild: AVLNode<T> | null = null
    rightChild: AVLNode<T> | null = null
    parent: AVLNode<T> | null = null
    hidden: Boolean = false
    factor: AVLBalance = AVLBalance.BALANCED
}
export class AVLTree<T> extends BinaryTree<T> {
    root: AVLNode<T> | null = null
    balance: Boolean = true
    constructor (root: AVLNode<T>, compare?: Compare<T>) {
        super(root)
        if (root) {
            this.root = root
        }
        if (compare) {
            this.compare = compare
        }
    }
    private compare: Compare<T> = (v1: T | null, v2: T | null) => {
        if (v1 == null || v2 == null) throw new Error('无效的比较')
        if (typeof v1 == 'number' && typeof v2 == 'number') {
            if (v1 < v2) {
                return -1
            } else if (v1 > v2) {
                return 1
            } else {
                return 0
            }
        } else {
            throw new Error('不支持的比较类型，需要用户自定义compare函数')
        }
    }
    private rotate_left (node: AVLNode<T>) {
        let parent
        if (node.parent) {
            parent = node.parent
        }
        if (node.leftChild && node.leftChild.factor == AVLBalance.LEFT_HEAVY) {
            // ll
            /*
                1.
                    parent || null
                      /
                   node
                   /  
                left
               /   \   
            ll      lr
            /
          new
            */
            
           /*
            2.
                    parent || null
                  /  
                node
               /
            lr
 ------------------------------------
            left
          /
        ll
        /
      new
             */
            const left = node.leftChild
            if (node.leftChild.rightChild)
                node.insertLeft(node.leftChild.rightChild)
            else
                node.removeLeft()
            /*
            3.
            parent || null
        --------------------------
           left
          /    \    
        ll      node
        /      /
       new   lr
        
            */            
            left.insertRight(node)
            /*
            4.
                parent        |            left(root)
                /             |           /    \
            left              |         ll     node
           /    \             |         /      /
        ll      node          |        new    lr
        /      /              |
      new    lr               |
            */
            if (parent) {
                parent.insertLeft(left)
            } else {
                this.root = left
            }
            node.factor = AVLBalance.BALANCED
            left.factor = AVLBalance.BALANCED
        } else if (node.leftChild && node.leftChild.rightChild) {
            console.log('wwww')
            // lr
            /*
            1.
                parent || null
                /
            node   
            /   \
        left    right
        /  \       
       ll   grand
           /
          new  

            2.
               parent || null
               /
            node
           /    \
         left   right
         /  \
        ll  new  
    -------------------
            grand

        3.
                parent || null
                /
             node
            /    \
    grand->right right
    (original)
    -------------------------
            grand
           /
         left
        /    \
       ll    new

        4.
          grand        parent || null
        /     \     /    \
    left        node        
    /  \      /     \
   ll  new grand->right right
           (original)
        
        5.
             parent || null
           / 
          grand(root if parent == null)        
        /     \ 
    left       node        
    /  \      /    \
   ll  new grand->right right
           (original)

            */
            const newChild = node.leftChild.rightChild.leftChild
            const left = node.leftChild
            const grandChild = node.leftChild.rightChild
            // 2
            if (newChild)
                left.insertRight(newChild)
            else
                left.removeRight()
            // 3
            if (grandChild.rightChild)
                node.insertLeft(grandChild.rightChild)
            if (grandChild)
                grandChild.insertLeft(left)
            // 4
            grandChild.insertRight(node)
            if (parent) {
                parent.insertLeft(grandChild)
            } else {
                this.root = grandChild
            }
            switch (grandChild.factor) {
                case AVLBalance.LEFT_HEAVY:
                    node.factor = AVLBalance.RIGHT_HEIAVY
                    left.factor = AVLBalance.BALANCED
                break
                case AVLBalance.BALANCED:
                break
            }
            grandChild.factor = AVLBalance.BALANCED

            // 5
            if (parent)
                parent.insertLeft(grandChild)
            else
                this.root = grandChild
        }
    }
    private rotate_right (node: AVLNode<T>) {
        let parent
        if (node.parent) {
            parent = node.parent
        }
        if (node.rightChild && node.rightChild.factor == AVLBalance.RIGHT_HEIAVY) {
            // rr
            /*
                1.
                        parent || null
                             \
                            node
                               \
                               right
                              /     \
                            rl       rr
                                      \
                                      new
            */
            const right = node.rightChild
            const rl = node.rightChild.leftChild
           /*
            2.
                parent || null
                             \
                            node
                               \
                               rl
            --------------------------------
                                  right
                                    \
                                     rr
                                      \
                                      new
             */
            if (rl)
                node.insertRight(rl)
            else
                node.removeRight()
            /*
            3.
            parent || null
        --------------------------
           right
          /     \
        node    rr
          \      \
           rl     new
            */            
           right.insertLeft(node)
            /*
            4.
          parent
             \
           right(root if parent is null)
          /     \
        node    rr
          \      \
           rl     new
            */
           if (!parent) {
               this.root = right
           } else {
               parent.insertRight(right)
           }
           node.factor = AVLBalance.BALANCED
           right.factor = AVLBalance.BALANCED
        } else if (node.rightChild && node.rightChild.leftChild) {
            // rl
            /*
            1.
                parent || null
                    \
                    node
                   /    \
                left   right
                /      /   \
               ll    grand  rr
                        \
                        new
            */
            const right = node.rightChild
            const grandChild = node.rightChild.leftChild
            const newChild = grandChild.rightChild
           /*
            2.
               parent || null
               /
            node
           /    \
         left   right
         /      /   \
        ll     new  rr
    -------------------
            grand
            */
            if (newChild)
                right.insertLeft(newChild)
            else
                right.removeLeft()
           /*
        3.
                parent || null
                /
             node
            /    \
          left grand->left
               (original)   
    -------------------------
            grand
                \
                right
                /  \ 
               new  rr
            */
            if (grandChild.leftChild) {
                node.insertRight(grandChild.leftChild)
            } else {
                node.removeRight()
            }
           /*
        4.
                  grand       parent || null
               /        \      /
           node          right 
         /     \         /  \
    left   grand->left  new  rr
           (original) 
        */
            grandChild.insertLeft(node)
        /*
        5.
                parent || null
                   \
                  grand (root if parent is null)
               /        \      
           node          right 
         /     \         /  \
    left   grand->left  new   rr
           (original)
           */
            grandChild.factor = AVLBalance.BALANCED
            if (!parent) {
                this.root = right
            } else {
                parent.insertRight(right)
            }
        }
    }
    insert (_node: AVLNode<T> | T, parent?: AVLNode<T>) {
        let node
        if (_node instanceof AVLNode) {
            node = _node
        } else {
            node = new AVLNode(_node)
        }
        if (!this.root) {
            this.root = node
        } else {
            if (!parent) {
                parent = this.root as AVLNode<T>
            }
            const cmpval = this.compare(node.data, parent.data)
            if (cmpval < 0) {
                // move to left
                if (parent.leftChild) {
                    this.insert(node, parent.leftChild)
                } else {
                    parent.insertLeft(node)
                    this.balance = false
                }
                // banlance
                if (!this.balance && parent) {
                    switch (parent.factor) {
                        case AVLBalance.LEFT_HEAVY:
                            this.rotate_left(parent)
                            this.balance = true
                        break
                        case AVLBalance.BALANCED:
                            parent.factor = AVLBalance.LEFT_HEAVY
                        break
                        case AVLBalance.RIGHT_HEIAVY:
                            parent.factor = AVLBalance.RIGHT_HEIAVY
                            this.balance = true
                        break
                    }
                }
            } else if (cmpval > 0) {
                // move to right
                if (parent.rightChild) {
                    this.insert(node, parent.rightChild)
                } else {
                    parent.insertRight(node)
                    this.balance = false
                }
                if (!this.balance) {
                    switch (parent.factor) {
                        case AVLBalance.LEFT_HEAVY:
                            parent.factor = AVLBalance.BALANCED
                            this.balance = true
                        break
                        case AVLBalance.BALANCED:
                            parent.factor = AVLBalance.RIGHT_HEIAVY
                        break
                        case AVLBalance.RIGHT_HEIAVY:
                            this.rotate_right(parent)
                            this.balance = true
                        break
                    }
                }
            } else {
                // Handle finding a copy of the data
                if (!parent.hidden) {
                    return
                } else {
                    parent.replaceBy(node)
                    parent.hidden = false
                    this.balance = true
                }
            }
        }
        
    }
}

let root = new AVLNode(50)
let tree = new AVLTree(root)

tree.insert(25)

tree.insert(15)

tree.insert(80)

tree.insert(100)

tree.insert(45)

// tree.insert(8)
// if (tree.root)
    // console.log(tree.root.leftChild)
// console.log(tree.root)
tree.forEachPreOrder((data, idx) => {
    console.log(data, idx)
})