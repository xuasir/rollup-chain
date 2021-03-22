import Config, { IRollupChain } from '../src'

describe('test config', () => {
  let c: IRollupChain
  beforeEach(() => {
    c = new Config()
  })

  it(`set input options`, () => {
    c.input('src/index.ts').preserveEntrySignatures('strict').cache(false)
    c.merge({
      input: {
        index: 'src/index.ts'
      },
      perf: true
    })

    expect(c.toConfig()).toEqual({
      preserveEntrySignatures: 'strict',
      cache: false,
      input: {
        index: 'src/index.ts'
      },
      perf: true,
      treeshake: true
    })
  })
})
