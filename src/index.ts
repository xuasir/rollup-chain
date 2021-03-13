import type { RollupOptions } from 'rollup'
import type { IChainedMapSet, IRollupChainConfig } from './lib/types'
// ops
import { ChainedMap, ChainedSet } from './lib'
import Output from './output'
import Plugin, { IPlugin } from './plugin'
import Treeshake from './treeshake'
import Watch from './watch'

class RollupChain extends ChainedMap {
  input!: IChainedMapSet<string | Record<string, string>, this>
  cache!: IChainedMapSet<RollupOptions['cache'], this>
  onwarn!: IChainedMapSet<RollupOptions['onwarn'], this>
  context!: IChainedMapSet<RollupOptions['context'], this>
  external
  watch
  treeshake
  output
  private plugins

  constructor() {
    super()
    this.external = new ChainedSet<this, string | RegExp>(this)
    this.output = new Output<this>(this)
    this.treeshake = new Treeshake<this>(this)
    this.watch = new Watch<this>(this)
    this.plugins = new ChainedMap<this>(this)
    this.extend(['input', 'cache', 'onwarn', 'context'])
  }

  plugin(name: string) {
    return this.plugins.getOrCompute(name, () => new Plugin(this, name))
  }

  removePlugn(name: string) {
    this.plugins.delete(name)
    return this
  }

  clearPlugins() {
    return this.plugins.clear().end()
  }

  clear() {
    super.clear()
    this.plugins.clear()
    this.external.clear()
    this.watch.clear()
    this.treeshake.clear()
    this.output.clear()
    return this
  }

  toConfig() {
    const entries = this.entries() || {}
    entries.external = this.external.values()
    entries.output = this.output.entries()
    entries.treeshake = this.treeshake.toConfig()
    entries.watch = this.watch.entries()
    entries.plugins = this.plugins
      .values()
      .map((plugin) => (plugin as IPlugin).toConfig())
      .filter(Boolean)

    const finalEntries = this.clean(entries) as IRollupChainConfig
    return !Object.keys(finalEntries).length ? null : finalEntries
  }

  entries() {
    const entries = super.entries() || {}
    // patch other
    entries.external = this.external.values()
    entries.output = this.output.entries()
    entries.plugins = this.plugins.entries()
    entries.treeshake = this.treeshake.toConfig()
    entries.watch = this.watch.entries()
    // clean and output
    return this.clean(entries)
  }

  mergeBase(obj: Record<string, any>) {
    super.mergeBase(obj, [
      'plugins',
      'output',
      'treeshake',
      'watch',
      'external'
    ])
    // merge external
    if ('external' in obj) {
      this.external.mergeBase(obj?.external || [])
    }
    // merge output
    if ('output' in obj) {
      this.output.mergeBase(obj?.output || {})
    }
    // merge plugins
    if ('plugins' in obj) {
      this.plugins.mergeBase(obj?.plugins || {})
    }
    // merge treeshake
    if ('treeshake' in obj) {
      this.treeshake.merge(obj?.treeshake || true)
    }
    // merge watch
    if ('watch' in obj) {
      this.watch.mergeBase(obj?.watch || {})
    }

    return this
  }
}

export type IRollupChain = InstanceType<typeof RollupChain>

export default RollupChain

// types
export { IRollupChainConfig } from './lib/types'
