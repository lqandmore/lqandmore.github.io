import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

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
  plugins: [vue()],
  
})
