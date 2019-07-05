import {LinkedList} from '../linkedList/LinkedList'
import {ListNode} from '../linkedList/ListNode'
// 顶点
// 边 顶点直接的关联关系
// 邻接 有向图：a->b，b与a邻接，a不与b邻接
// 邻接 无向图：a-b，a与b邻接，b与a邻接
// 度   有向图，顶点的入度（以该顶点为终点的边的数目），出度（以该顶点为起点的边的数目）
// 度   无向图，度（顶点于其他顶点的关联边的数目）
// 路径 从一个顶点出发，到另一个顶点结束，经过的所有的边
// 环   路径经过两次及以上相同顶点
// 连通
// 强连通
// 桥
// 稀疏图
// 稠密图
enum SearchStatus {
  FOUND = 'found',
  NOT_FOUND = 'notFound',
}
export interface IVertex<T> {
  status: SearchStatus
  data: T | null
  adjList: LinkedList<IVertex<T>> 
  outDegree: () => number
}

export interface IGraph<T> {
  vertexList: IVertex<T>[]
  insertVertex: (vertex: IVertex<T>) => void
  setAdjacent: (v1: IVertex<T>, v2: IVertex<T>) => void
}
export class Vertex<T> implements IVertex<T> {
  status = SearchStatus.NOT_FOUND
  data: T | null = null
  adjList: LinkedList<IVertex<T>> = new LinkedList()
  constructor (data: T) {
    this.data = data
  }
  outDegree () {
    return this.adjList.getLength()
  }
}
export default class Graph<T> implements IGraph<T> {
  vertexList: IVertex<T>[] = []
  setAdjacent (v1: IVertex<T>, v2: IVertex<T>) {
    v1.adjList.push(v2)
  }
  insertVertex (vertex: IVertex<T>) {
    if (!this.vertexList.find(v => v === vertex)) {
      this.vertexList.push(vertex)
    }
  }
  removeVertex (vertex: IVertex<T>) {
    this.vertexList.forEach(v => {
      if (v.adjList.getLength() === 1) {
        if (v.adjList.head && v.adjList.head.data === vertex) {
          v.adjList = new LinkedList()
        }
      } else {
        v.adjList.traverse(listNode => {
          if (listNode.data === vertex) {
            if (listNode.prev)
              listNode.prev.removeNext()
            else if (listNode.next)
              listNode.next.removeBefore()
          }
        })        
      }
    })
    this.vertexList = this.vertexList.filter(v => v !== vertex)
  }
  // 过节串门
  bfsTraverse (cb: (vertex: IVertex<T>) => boolean | void) {
    function traverse (list: IVertex<T>[]) {
      const vertex = list.shift()
      if (vertex) {
        vertex.adjList.forEach(v => {
          if (v.status === SearchStatus.NOT_FOUND){
            v.status = SearchStatus.FOUND
            list.push(v)
          }
        })
        if (!cb(vertex)) {
          traverse(list)
        }
      }
    }
    this.vertexList.forEach(v => {
      if (v.status === SearchStatus.FOUND) return
      v.status = SearchStatus.FOUND
      traverse([v])
    })

    // reset
    this.vertexList.forEach(v => v.status = SearchStatus.NOT_FOUND)
  }
  // 过家门而不入
  dfsTraverse (cb: (vertex: IVertex<T>) => boolean | void) {
    function traverse (vertex: IVertex<T>) {
      if (vertex.status === SearchStatus.NOT_FOUND) {
        const stack: IVertex<T>[] = []
        if (vertex.adjList.head) {
          vertex.adjList.forEach((v) => {
            if (v.status === SearchStatus.NOT_FOUND)
              stack.push(v)
          })
          stack.reverse()
          stack.forEach(v => {
            traverse(v)
          })
        }
        vertex.status = SearchStatus.FOUND
        cb(vertex)
      }
    }
    this.vertexList.forEach(v => traverse(v))
    this.vertexList.forEach(v => v.status = SearchStatus.NOT_FOUND)
  }
  private search (v: IVertex<T>, vertex: IVertex<T> | T, cb: (vertex: IVertex<T>) => void) {
    if ((<IVertex<T>>vertex).status) {
      if (v === vertex) {
        cb(v)
        return true
      }
    } else if ((vertex as T) === v.data) {
      cb(v)
      return true
    }
  }
  bfsSearch (vertex: IVertex<T> | T, cb: (vertex: IVertex<T>) => void) {
    this.bfsTraverse(v => this.search(v, vertex, cb))
  }
  dfsSearfch (vertex: IVertex<T> | T, cb: (vertex: IVertex<T>) => void) {
    this.dfsTraverse(v => this.search(v, vertex, cb))
  }
  getInDegree (vertex: IVertex<T>) {
    let cnt = 0
    this.vertexList.forEach(v => {
      v.adjList.forEach(_v => {
        if (_v === vertex)
          cnt++
      })
    })
    return cnt
  }
  getOutDegree (vertex: IVertex<T>) {
    return vertex.outDegree()
  }
}
