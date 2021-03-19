import { defineConfig } from '@xus/cli'

export default defineConfig({
  libBuild: {
    target: 'es2015',
    formats: ['esm', 'cjs'],
    sourcemap: false,
    minify: false,
    alwaysEmptyDistDir: true,
    afterBuild: [
      {
        bin: 'yarn',
        args: ['types'],
        message: {
          start: 'generate types start',
          failed: 'generate types failed',
          succeed: 'generate types succeed'
        }
      }
    ]
  },
  lint: {
    eslint: {
      include: 'src/**/*',
      ext: ['.ts']
    }
  },
  release: {
    branch: 'main'
  }
})
