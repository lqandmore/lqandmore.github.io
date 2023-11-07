<script setup lang="ts">
import { VNode, onMounted, ref } from 'vue';
import { marked } from "marked"
import axios from "axios"
import "github-markdown-css/github-markdown.css"
import { h } from 'vue'
import { Token } from 'Tokens';

const props = defineProps({
  src: String
})

var rendererMD = new marked.Renderer();
rendererMD.paragraph = (text: string) => {
  // text = text.replace(" ", "&nbsp;");
  return `<p class="mark-p" style="text-align: left;">${text}</p>\n`
}
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  breaks: false,
  pedantic: false,

});//基本设置

const contentRef = ref("")
async function readMarkdownFile () {
  try {
    const response = await axios.get(props.src);
    console.log(response.data);

    contentRef.value = marked.parse(response.data);
    // console.log(contentRef.value);

    const list = marked.lexer(response.data);
    console.log(list);


  } catch (error) {
    console.error(error);
  }
}

function tokenList2Vnodes (list: Token[]): VNode[] {
  const children = []
  if (list.length === 0) return children

  list.forEach((token) => {
    const v = token2Vnode(token)
    children.push(v)
  })
  return children
}

// return `
//             <h${level}>
//               <a name="${escapedText}" class="anchor" href="#${escapedText}">
//                 <span class="header-link"></span>
//               </a>
//               ${text}
//             </h${level}>`;

function token2Vnode (token: Token): VNode {
  let children: VNode[]

  switch (token.type) {

    case 'space':
      return h('br')
    case 'code':
      return h('p', token.text)
    case "heading":
      children = tokenList2Vnodes(token.tokens)
      const text = h(Text, token.text)
      children.push(text)
      return h(`h${token.depth}`, children)
    case 'table':
      return h('p', token.raw)
    case 'hr':
      return h('p', token.raw)
    case 'blockquote':
      return h('br')
    case 'list':
      return h('p', token.text)
    case 'list_item':
      return h('br')
    case 'paragraph':
      return h('p', token.text)
    case 'html':
      return h('html', token.text)
    case 'text':
      return h('p', token.text)
    case 'def':
      return h('p', token.title)
    case 'escape':
      return h('br')
    case 'link':
      children = tokenList2Vnodes(token.tokens)
      return h('a', { href=token.href, title=token.title }, children)
    case 'image':
      return h('p', { src=token.href })
    case 'strong':
      return h('strong', token.text)
    case 'em':
      return h('p', token.text)
    case 'codespan':
      return h('p', token.text)
    case 'br':
      return h('br')
    case 'del':
      return h('delete', token.text)
    default:
      return h(`${token.type}`, token.raw)

  }
}

function

  onMounted (() => {
    readMarkdownFile()
  })

</script>

<template>
  <div id="markdown" class="markdown-body" v-html="contentRef">
  </div>
  <div class="aba">
    <p class="mark-p">222222</p>
  </div>
</template>

<style scoped>
.markdown-body {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;

  p {
    text-align: left;
    margin-block-start: 0.3rem;
    margin-block-end: 0.3rem;
  }
}

.mark-p {
  text-align: right;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
