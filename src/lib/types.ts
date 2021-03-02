import type { RollupOptions, OutputOptions } from 'rollup'

export { IChainedMap } from './chainedMap'
export { IChainedSet } from './chainedSet'

export type IChainedMapSet<T = any, P = any> = (value: T) => P
export type IChainedSetAdd<T = any, P = any> = (value: T) => P

export interface IRollupChainConfig extends RollupOptions {
  input: string | string[]
  output: OutputOptions
}
