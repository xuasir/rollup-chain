import type { RollupOptions, OutputOptions } from 'rollup'

export type { IChainedMap } from './chainedMap'
export type { IChainedSet } from './chainedSet'

export type IChainedMapSet<T = any, P = any> = (value: T) => P
export type IChainedSetAdd<T = any, P = any> = (value: T) => P

export interface IRollupChainConfig extends RollupOptions {
  input: string | Record<string, string>
  output: OutputOptions
}
