import Watch from '../src/watch'

describe(`test watch`, () => {
  const parent = { parent: 1 }
  const wt = new Watch(parent)

  it(`end to parent`, () => {
    expect(wt.end()).toBe(parent)
  })

  it(`set value`, () => {
    wt.include('src/**/*')
      .exclude('node_modules')
      .buildDelay(10)
      .clearScreen(true)

    wt.when(
      false,
      (w) => w.skipWrite(true),
      (w) => w.skipWrite(false)
    )

    expect(wt.entries()).toEqual({
      include: 'src/**/*',
      exclude: 'node_modules',
      buildDelay: 10,
      clearScreen: true,
      skipWrite: false
    })
  })
})
