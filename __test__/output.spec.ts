import Output from '../src/output'

describe(`test output`, () => {
  const parent = { parent: 1 }
  const op = new Output(parent)
  beforeEach(() => {
    op.clear()
  })

  it(`end to parent`, () => {
    expect(op.end()).toBe(parent)
  })

  it(`set value`, () => {
    op.file('dist/index.js').format('esm').dir('dist').name('lib')

    expect(op.entries()).toEqual({
      file: 'dist/index.js',
      format: 'esm',
      dir: 'dist',
      name: 'lib'
    })

    // merge
    op.mergeBase({
      dir: 'lib',
      name: 'Name'
    })
    expect(op.entries()).toEqual({
      file: 'dist/index.js',
      format: 'esm',
      dir: 'lib',
      name: 'Name'
    })
  })
})
