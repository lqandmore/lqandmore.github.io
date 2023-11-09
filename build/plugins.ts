import fs from "fs-extra"
import createVuePlugin from "@vitejs/plugin-vue";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import marked from "marked"
import Markdown from 'unplugin-vue-markdown/vite'
import prism from 'markdown-it-prism'


const fileRegex = /\.(md)$/;
const vuePlugin = createVuePlugin({ include: [/\vue$/, /\.md$/] });
function demoLoader(code, path) {
  const token = marked.lexer(code)
  return vueComponent
}

function transfromMD() {
  return {
    name: 'vite-plugin-md',
    async transfrom(_, path) {
      const code = await fs.readFile(path, 'utf-8')
      if (path.endsWith('.md')) {
        return demoLoader(code, path)
      }
    },
    async handleHotUpdate(ctx) {
      const { file } = ctx
      if (fileRegex.test(file)) {
        const code = await fs.readFile(file, 'utf-8')
        let codeLoader
        if (path.extname() === '.md') {
          codeLoader = demoLoader(code, path)
        }
        return vuePlugin.handleHotUpdate({
          ...ctx,
          read: ()=> codeLoader
        })
      }
    }
  }
}


export function getPluginsList(commond: string, VITE_CDN: boolean) {
  return [
    vueJsx(),
    vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown({
      headEnabled: true,
      markdownItUses: [
        prism,
      ],
    })

  ];
}
