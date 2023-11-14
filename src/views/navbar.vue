<script setup lang="ts">
const data = ["主页", "项目", "经历", "联系", "English"];

const itemClick = (index: number) => {
  console.log(index);
};
</script>

<template>
  <div class="nav-bar">
    <el-row :gutter="20">
      <template v-for="(item, index) in data" :key="item">
        <el-col :span="4">
          <div @click="itemClick(index)" class="grid-content">{{ item }}</div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<style scoped>
.nav-bar {
  float: right;
  width: 50vw;
  height: 50px;
}
.el-row {
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  line-height: 100%;
}
</style>
