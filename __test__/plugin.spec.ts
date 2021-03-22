import { ChainedMap } from '../src/lib'
import Plugin from '../src/plugin'

const p1 = (ops?: { a?: string; b?: boolean }) => ({ name: 'p1' })
const p2 = (ops?: { a?: string; b?: boolean }) => ({ name: 'p2' })

describe(`test plugin`, () => {
  const parent = { parent: 1 }
  const p = new Plugin(parent, 'test')

  it(`end to parent`, () => {
    expect(p.end()).toBe(parent)
  })

  it(`set value`, () => {
    // use
    const arg = { a: 'a', b: true }
    p.use(p1, arg)
    const entries = p.entries()
    expect(entries!.args).toBe(arg)
    expect(entries!.plugin).toBe(p1)
    // tap
    p.tap((args) => {
      args.b = false
      return args
    })
    const et = p.entries()
    expect(et!.args).toEqual({ a: 'a', b: false })
    // config
    expect(p.toConfig()).toEqual({ name: 'p1' })
  })

  it(`test order`, () => {
    const plugins = new ChainedMap(parent)
    const setPlugin = (name: string) => {
      return plugins.getOrCompute(name, () => new Plugin(plugins, name))
    }

    setPlugin('p1').use(p1, { a: 'a', b: true })
    setPlugin('p2').use(p2, { a: 'a', b: false }).before('p1')

    expect(plugins.values().map((p) => p.toConfig())).toEqual([
      { name: 'p2' },
      { name: 'p1' }
    ])
  })
})
