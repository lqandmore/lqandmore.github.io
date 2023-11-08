<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Marked } from "marked"
import axios from "axios"
import "github-markdown-css/github-markdown.css"
import hljs from "highlight.js"
import { markedHighlight } from "marked-highlight"

const props = defineProps({
  src: String
})

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight (code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
)

const renderer = new marked.Renderer();
renderer.paragraph = (text: string) => {
  return `<p class="mark-p" >${text}</p>\n`
}
renderer.heading = (text: string, level: number, raw: string) => {

  return `
          <h${level}>
            ${text}
          </h${level}>`;
}
renderer.link = (href: string, _: string, text: string) => {
  return `<a class="my-markdown" style="color:red" href="${href}">${text}</a>`
}

marked.setOptions({
  renderer: renderer,
  gfm: true,
  breaks: false,
  pedantic: false,

});//基本设置

const contentRef = ref("")
async function readMarkdownFile () {
  try {
    const response = await axios.get(props.src);

    contentRef.value = marked.parse(response.data);
    console.log(contentRef.value);

  } catch (error) {
    console.error(error);
  }
}


onMounted(() => {
  readMarkdownFile()
  // const link = document.createElement('link')
  // link.type = 'text/css'
  // link.rel = 'stylesheet'
  // link.href = 'https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css'
  // document.head.appendChild(link)
})

</script>

<template>
  <div id="markdown" class="markdown-body" v-html="contentRef">
  </div>
</template>

<style lang="scss" type="text/scss" scoped>
#markdown {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.markdown-body {

  ::v-deep * {
    text-align: left;
    margin-block-start: 0.3rem;
    margin-block-end: 0.3rem;
  }

  .mark-p {
    text-align: right;
  }
}



@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
