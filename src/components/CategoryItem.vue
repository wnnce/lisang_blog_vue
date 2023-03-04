<!--分类列表中的每一项分类-->
<script setup>
import {ref} from "vue";

defineProps(['category'])
const isDivActive = ref(false)
</script>

<template>
  <router-link :to="'/category/' + category.id">
    <div class="category-item"  @mouseover="isDivActive = true"
         @mouseleave="isDivActive = false" :class="isDivActive ? 'active' : 'not-active'">
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
  animation-duration: 400ms;
  animation-fill-mode: forwards;
  color: #333;
}
.category-item:hover{
  background-color: #41b6e6;
  color: white;
  cursor: pointer;
}
.active{
  animation-name: active;
}
.not-active{
  animation-name: not-active;
}
@keyframes active {
  0% {padding: 8px 8px}
  100% {padding: 8px 24px}
}
@keyframes not-active {
  0% {padding: 8px 20px}
  100% {padding: 8px 8px}
}
</style>