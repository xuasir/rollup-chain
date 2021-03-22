import { Chainable, ChainedMap, ChainedSet } from '../src/lib'

describe(`test chainable`, () => {
  it(`end to parent`, () => {
    const parent = { parent: 1 }
    const chain = new Chainable(parent)
    expect(chain.end()).toBe(parent)
  })
})

describe(`test chained map`, () => {
  const parent = { parent: 1 }
  let chainedMap: InstanceType<typeof ChainedMap>
  beforeEach(() => {
    chainedMap = new ChainedMap(parent)
  })

  it(`end to parent`, () => {
    expect(chainedMap.end()).toBe(parent)
  })

  it(`base operate`, () => {
    // set get
    expect(chainedMap.isEmpty()).toBeTruthy()
    chainedMap.getOrCompute('a', () => 1)
    chainedMap.getOrCompute('b', () => 2)
    chainedMap.getOrCompute('c', () => 3)
    chainedMap.getOrCompute('d', () => 4)
    expect(chainedMap.has('a')).toBeTruthy()
    expect(chainedMap.get('b')).toBe(2)
    expect(chainedMap.has('c')).toBeTruthy()
    expect(chainedMap.values()).toEqual([1, 2, 3, 4])
    expect(chainedMap.entries()).toEqual({
      a: 1,
      b: 2,
      c: 3,
      d: 4
    })
    expect(chainedMap.delete('d')).toBeTruthy()
    expect(chainedMap.delete('d')).toBeFalsy()
    // clean
    chainedMap.getOrCompute('d', () => undefined)
    const entries = chainedMap.entries()
    expect(entries).toEqual({
      a: 1,
      b: 2,
      c: 3,
      d: undefined
    })
    expect(chainedMap.clean(entries!)).toEqual({ a: 1, b: 2, c: 3 })
    // when
    chainedMap.when(
      true,
      (c) => c.getOrCompute('true', () => true),
      (c) => c.getOrCompute('false', () => false)
    )
    expect(chainedMap.has('true')).toBeTruthy()
    expect(chainedMap.has('false')).toBeFalsy()
    // merge
    chainedMap.clear()
    chainedMap.getOrCompute('a', () => 1)
    chainedMap.getOrCompute('b', () => 2)
    chainedMap.getOrCompute('c', () => 3)
    chainedMap.mergeBase({
      a: 'a',
      e: 'e'
    })
    expect(chainedMap.clean(chainedMap.entries()!)).toEqual({
      a: 'a',
      b: 2,
      c: 3,
      e: 'e'
    })
    chainedMap.clear()
    chainedMap.getOrCompute('a', () => 1)
    chainedMap.getOrCompute('b', () => 2)
    chainedMap.getOrCompute('c', () => 3)
    chainedMap.mergeBase(
      {
        a: 'a',
        e: 'e'
      },
      ['e']
    )
    expect(chainedMap.clean(chainedMap.entries()!)).toEqual({
      a: 'a',
      b: 2,
      c: 3
    })
  })
})

describe(`test chained set`, () => {
  const parent = { parent: 1 }
  let chainedSet: InstanceType<typeof ChainedSet>
  beforeEach(() => {
    chainedSet = new ChainedSet(parent)
  })

  it(`end to parent`, () => {
    expect(chainedSet.end()).toBe(parent)
  })

  it(`base opreate`, () => {
    // set
    chainedSet.set(1)
    expect(chainedSet.has(1)).toBeTruthy()
    chainedSet.delete(1)
    expect(chainedSet.has(1)).toBeFalsy()
    // prepend
    chainedSet.set(1)
    chainedSet.set(2)
    chainedSet.prepend(3)
    expect(chainedSet.values()).toEqual([3, 1, 2])
    // clear
    chainedSet.clear()
    expect(chainedSet.has(1)).toBeFalsy()
    // merge
    chainedSet.clear()
    chainedSet.set(1).set(2).set(3)
    chainedSet.mergeBase([4, 5, 6])
    expect(chainedSet.values()).toEqual([1, 2, 3, 4, 5, 6])
  })
})
