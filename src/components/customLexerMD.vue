<script setup lang="ts">
import { VNode, onMounted, render } from 'vue';
import { marked } from "marked"
import axios from "axios"
import "github-markdown-css/github-markdown.css"
import { mddivFactory } from './mdTokenChange';

const props = defineProps({
  src: String
})


const renderer = new marked.Renderer();

marked.setOptions({
  renderer: renderer,
  gfm: true,
  breaks: false,
  pedantic: false,

});//基本设置

async function readMarkdownFile () {
  try {
    const response = await axios.get(props.src);
    const list = marked.lexer(response.data);
    console.log(list);


    const vnode = mddivFactory(list)

    renderVNode(vnode)
  } catch (error) {
    console.error(error);
  }
}

function renderVNode (vnode: VNode) {
  const el = document.querySelector('#my-markdown')
  render(vnode, el)
}

onMounted(() => {
  readMarkdownFile()
})

</script>

<template>
  <div id="my-markdown">

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
  text-align: center;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
