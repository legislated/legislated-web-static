/* eslint-env jest */
import { unwrap } from '../connection'

describe('#unwrap', () => {
  let connection

  it('propogates the page info', () => {
    const pageInfo = {
      hasNextPage: true
    }

    connection = {
      pageInfo,
      edges: []
    }

    expect(unwrap(connection).pageInfo).toEqual(pageInfo)
  })

  it('unwraps the nodes', () => {
    connection = {
      edges: [
        { node: 1 },
        { node: 2 }
      ]
    }

    expect(unwrap(connection).nodes).toEqual([1, 2])
  })

  it('returns an empty array when passed null', () => {
    connection = null
    expect(unwrap(connection).nodes).toEqual([])
  })
})
