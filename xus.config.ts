import { defineConfig } from '@xus/cli'

export default defineConfig({
  libBuild: {
    target: 'es2015',
    formats: ['esm', 'cjs'],
    sourcemap: false,
    minify: false,
    alwaysEmptyDistDir: true
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
