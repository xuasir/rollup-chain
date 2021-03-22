import TreeShake from '../src/treeshake'

describe(`test treeShake`, () => {
  const parent = { parent: 1 }
  const ts = new TreeShake(parent)
  beforeEach(() => {
    ts.clear()
  })

  it(`end to parent`, () => {
    expect(ts.end()).toBe(parent)
  })

  it(`set value`, () => {
    ts.false()
    expect(ts.toConfig()).toBeFalsy()

    ts.annotations(false)
      .moduleSideEffects(false)
      .propertyReadSideEffects(false)
      .unknownGlobalSideEffects(false)
    expect(ts.toConfig()).toEqual({
      annotations: false,
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      unknownGlobalSideEffects: false
    })
    // merge
    ts.merge(true)
    expect(ts.toConfig()).toBeTruthy()

    // when
    ts.when(
      true,
      (ts) => ts.moduleSideEffects(true),
      (ts) => ts.moduleSideEffects(false)
    )
    expect(ts.toConfig()).toBeTruthy()
  })
})
