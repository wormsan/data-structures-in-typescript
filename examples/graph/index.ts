import Graph, { Vertex, IVertex } from '../../dataStructures/graph'
function dfs () {

  const g = new Graph<number>()

  const v1 = new Vertex(1)
  const v2 = new Vertex(2)
  const v3 = new Vertex(3)
  const v4 = new Vertex(4)
  const v5 = new Vertex(5)
  
  g.insertVertex(v1)
  g.insertVertex(v2)
  g.insertVertex(v3)
  g.insertVertex(v4)
  g.insertVertex(v5)

  g.setAdjacent(v1, v2)
  g.setAdjacent(v1, v3)
  g.setAdjacent(v2, v3)
  g.setAdjacent(v2, v5)
  g.setAdjacent(v4, v2)
  g.setAdjacent(v4, v1)
  g.setAdjacent(v4, v5)
  g.setAdjacent(v5, v3)

  g.dfsTraverse((v) => {
    // console.log(v.data)
  })

  // console.log(g.getInDegree(v3))
  // console.log(g.getOutDegree(v3))
  // console.log('--')
  // console.log(v4.adjList.getLength())
  // g.removeVertex(v1)
  // console.log(v4.adjList.getLength())
  console.log(topologicalSort(g))
  // console.log(g.getInDegree(v2))
  // console.log(g.getInDegree(v1))

}

function bfs () {
  const g = new Graph<number>()

  const v1 = new Vertex(1)
  const v2 = new Vertex(2)
  const v3 = new Vertex(3)
  const v4 = new Vertex(4)
  const v5 = new Vertex(5)

  g.insertVertex(v1)
  g.insertVertex(v2)
  g.insertVertex(v3)
  g.insertVertex(v4)
  g.insertVertex(v5)

  g.setAdjacent(v1, v2)
  g.setAdjacent(v1, v3)
  g.setAdjacent(v2, v3)
  g.setAdjacent(v2, v4)
  g.setAdjacent(v3, v2)
  g.setAdjacent(v3, v4)
  g.setAdjacent(v4, v1)
  g.setAdjacent(v5, v4)
  g.setAdjacent(v5, v3)

  g.bfsTraverse((v) => {
    console.log(v.data)
  })
}

console.log('dfs')
dfs()
// console.log('bfs')
// bfs()
function topologicalSort<T> (g: Graph<T>) {
  const result: IVertex<T>[] = []
  function sort (g: Graph<T>) {
    const lonelyVertexs = g.vertexList.map(vertex => {
      if (g.getInDegree(vertex) === 0) {
        return vertex
      }
    }).filter(v => v)
    lonelyVertexs.forEach(v => {
      if (v) {
        result.push(v)
        g.removeVertex(v)
      }
    })
    if (lonelyVertexs.length > 0) {
      sort(g)
    }
  }
  sort(g)
  return result
}
