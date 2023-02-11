<script setup>
import LinkBody from "@/components/LinkBody.vue";
import Artalk from "@/components/Artalk.vue";
import {onMounted, ref} from "vue";
import {_getLinkList} from "@/assets/js/api";
import {isArrayNull} from "@/assets/js/util";

const linkList = ref([])

async function getLinkList(){
  linkList.value = await _getLinkList();
}

onMounted(() => {
  getLinkList();
})
</script>

<template>
  <a-card title="友情链接" hoverable class="card-base" :loading="isArrayNull(linkList)">
    <a-row :gutter="[24, 12]">
      <a-col :xl="8" :md="12" :xs="24" v-for="link in linkList" :key="link.id">
        <LinkBody :link="link" />
      </a-col>
    </a-row>
  </a-card>
  <div style="padding-top: 24px">
    <Artalk title="博客友情链接" placeholder="留下友链需要logo图片链接、站点标题、站点简介(非必须)、网站链接默认采用评论的网址链接..."/>
  </div>
</template>

<style scoped>

</style>