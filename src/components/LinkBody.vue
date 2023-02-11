<!--友链组件-->
<script setup>
defineProps(['link'])
import { ref } from "vue";

const ellipsis = ref({
  rows: 1
})
</script>

<template>
  <div class="link-container">
    <div class="link-avatar text-center">
      <a-avatar :src="link.logoUrl" :size="48"></a-avatar>
    </div>
    <a :href="link.url" target="_blank">
      <div class="link-main">
        <a-typography-title :level="5" :ellipsis="ellipsis">
          {{link.title}}
        </a-typography-title>
        <a-typography-text type="secondary" :ellipsis="ellipsis" style="font-size: 12px">
          {{link.summary}}
        </a-typography-text>
      </div>
    </a>
  </div>
</template>

<style scoped lang="scss">
.link-container{
  width: 100%;
  height: 120px;
  .link-avatar{
    padding: 0 24px 0 0;
    text-align: end;
    height: 20%;
  }
  .link-main{
    padding: 24px 12px 12px 12px;
    height: 80%;
    border-radius: 12px;
    box-shadow: gainsboro 0 0 8px;
  }
  .link-main:hover{
    //cursor: pointer;
    background-color: #bbded6;
  }
}

</style>