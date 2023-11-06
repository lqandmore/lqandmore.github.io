import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Markdown from 'unplugin-vue-markdown/vite'
import prism from 'markdown-it-prism'

const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir)
}

const alias: Record<string, string> = {
  "@": pathResolve("src"),
  "@build": pathResolve("build")
}
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias
  },
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown({
      headEnabled: true,
      markdownItUses: [
        prism,
      ],
    })

  ],
  build: {
    sourcemap: true
  }

})
