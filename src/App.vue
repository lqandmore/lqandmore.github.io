<script setup lang="ts">
import navBar from "@/views/navbar.vue";
import detail from "@/views/detail.vue";

import { computed, ref } from "vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";

const language = ref("zh-cn");
const locale = computed(() => (language.value === "zh-cn" ? zhCn : en));

const toggle = () => {
  language.value = language.value === "zh-cn" ? "en" : "zh-cn";
};
</script>

<template>
  <el-config-provider :locale="locale">
    <el-button mb-2 @click="toggle">Switch Language</el-button>
    <el-table mb-1 :data="[]" />
    <el-pagination :total="100" />
  </el-config-provider>

  <div>
    <el-container class="common-layout">
      <el-header>
        <h1 class="title">李权的简历</h1>
        <navBar />
      </el-header>
      <el-main>
        <detail></detail>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
    <!-- <markdemo /> -->
    <!-- <markdown src="./src/2023/demo.md" /> -->
  </div>
</template>

<style scoped>
.title {
  display: inline-block;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-left: 0;
  line-height: 80px;
}

.Title {
  color: red;
}

.el-container {
  /* width: 100vw; */
}

.el-header {
  position: relative;
  height: 80px;
  background-color: orange;
  justify-content: space-between;
}
.el-main {
}
</style>
