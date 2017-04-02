/* eslint-env jest */
import { nodes } from '../connection'
import  type { Connection } from '../connection' // eslint-disable-line

describe('#nodes', () => {
  let connection: ?Connection<number>

  it('returns the nodes when passed a connection', () => {
    connection = {
      edges: [
        { node: 1 },
        { node: 2 }
      ]
    }

    expect(nodes(connection)).toEqual([1, 2])
  })

  it('returns an empty array when passed null', () => {
    connection = null
    expect(nodes(connection)).toEqual([])
  })
})
