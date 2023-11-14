import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import Markdown from "unplugin-vue-markdown/vite";
import prism from "markdown-it-prism";
import createVuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import marked from "marked";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Inspect from "vite-plugin-inspect";

const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

const alias: Record<string, string> = {
  "@": pathResolve("src"),
  "@build": pathResolve("build"),
};

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias,
  },
  plugins: [
    vueJsx(),
    vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown({
      headEnabled: true,
      markdownItUses: [prism],
    }),
    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/core"],
      dts: "src/auto-imports.d.ts",
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: "Icon",
        }),
      ],
    }),
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ["ep"],
        }),
        ElementPlusResolver(),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
    Inspect(),
  ],
  build: {
    sourcemap: true,
  },
});
