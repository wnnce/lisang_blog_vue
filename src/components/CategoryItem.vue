<!--分类列表中的每一项分类-->
<script setup>
import {ref} from "vue";

defineProps(['category'])
const isDivActive = ref(false)
</script>

<template>
  <router-link :to="'/label/' + category.id">
    <div class="category-item">
      <span>{{category.name}}</span>
      <span>{{category.articleNum}}</span>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
.category-item{
  display: flex;
  justify-content: space-between;
  padding: 8px 8px;
  color: #333;
  transition: padding-right 500ms ease, padding-left 500ms ease;
}
.category-item:hover{
  background-color: #41b6e6;
  color: white;
  cursor: pointer;
  padding: 8px 20px;
}
</style>