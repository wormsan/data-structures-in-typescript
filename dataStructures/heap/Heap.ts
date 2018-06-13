export class Heap<T> {
    private tree: T[] = []
    private sortBy: string
    private parentOf (pos: number) : number {
        return Math.floor((pos - 1) / 2)
    }
    private leftNodeOf (pos: number) : number {
        return pos * 2 + 1
    }
    private rightNodeOf (pos: number) : number {
        return pos * 2 + 2
    }
    private swap (pos1: number, pos2: number) {
        const temp = this.tree[pos1]
        this.tree[pos1] = this.tree[pos2]
        this.tree[pos2] = temp
    }
    /**
     * @param {T} v1 
     * @param {T} v2 
     * @returns {Boolean} true is v1 > v2, false is v1 < v2
     */
    private compare (v1: T, v2: T) : Boolean {
        let result = false
        if (this.sortBy == 'big') {
            if (v1 > v2) {
                result = true
            }
        } else if (this.sortBy == 'small') {
            if (v1 < v2) {
                return true
            }
        }
        return result
    }
    constructor (sortBy : string = 'big', compare?: (v1: T, v2: T) => Boolean ) {
        this.sortBy = sortBy
        if (compare) this.compare = compare
    }
    getData () : T[] {
        return this.tree
    }
    insert (data: T) {
        this.tree.push(data)
        let i = this.tree.length - 1
        while (i >= 0) {
            const parentPos = this.parentOf(i)
            if (this.compare(this.tree[i], this.tree[parentPos])) {
                this.swap(i, parentPos)
                i = parentPos
            } else {
                break
            }
        }
    }
    extract () : T {
        const last = this.tree[this.tree.length - 1]
        const top = this.tree[0]
        const poped = this.tree.pop()
        if (poped) {
            this.tree[0] = poped
        }
        let i = 0
        let moveToPos = i
        while (i < this.tree.length) {
            const leftChildPos = this.leftNodeOf(i)
            const righChildPos = this.rightNodeOf(i)
            if (!this.compare(this.tree[i], this.tree[leftChildPos])) {
                moveToPos = leftChildPos
            }
            if (!this.compare(this.tree[i], this.tree[leftChildPos])) {
                moveToPos = righChildPos
            }
            if (this.sortBy == 'small') {

            }
            if (moveToPos == i) {
                break
            } else {
                this.swap(i, moveToPos)
                i = moveToPos
            }
        }
        return top
    }
}