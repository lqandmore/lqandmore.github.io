<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { marked } from "marked"
import axios from "axios"
import "github-markdown-css/github-markdown.css"

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
    console.log(contentRef.value);

  } catch (error) {
    console.error(error);
  }
}



onMounted(() => {
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
