<script setup lang="ts">
// import markdemo from './2023/demo.md'
import markdown from "./components/markdown.vue";
import navBar from "@/views/navbar.vue";
import detail from "@/views/detail.vue";
</script>

<template>
  <div>
    <el-container class="common-layout">
      <el-header>
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
.el-container {
  width: 100vw;
}

.el-header {
  position: relative;
  width: 100%;
  height: 80px;
  background-color: orange;
}
.el-main {
}
</style>
