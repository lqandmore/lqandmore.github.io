<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { marked } from "marked"
import axios from "axios"

const props = defineProps({
  src: String
})

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
})

</script>

<template>
  <div id="markdown" v-html="contentRef">
  </div>
  <div class="aba">
    </div>
</template>

<style scoped>
#markdown {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-color: aquamarine;
  border-width: 1px;
}
</style>
