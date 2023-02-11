<script setup>
import TextSM from "@/components/TextSM.vue"
import {go404, goArticle} from "@/assets/js/router";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {_getTagInfo, _getArticleListByTagId} from "@/assets/js/api";
import {isObjectNull} from "@/assets/js/util";
const route = useRoute();
const id = ref('');
const tagInfo = ref({})
const articlePageInfo = ref({})

async function initCategoryInfo(){
  tagInfo.value = await _getTagInfo(id.value);
  if (!tagInfo.value){
    await go404();
  }
  if (tagInfo.value.articleNum > 0){
    await getArticleList(1)
  }
}
async function getArticleList(pageNum){
  articlePageInfo.value = await _getArticleListByTagId(id.value, pageNum)
}
onMounted(() => {
  let tempId = Number(route.params.id);
  if (isNaN(tempId)){
    go404()
  }else {
    id.value = tempId;
    initCategoryInfo()
  }
})
onBeforeRouteUpdate((value) => {
  let tempId = Number(value.params.id);
  if (isNaN(tempId)){
    go404()
  }else{
    id.value = tempId;
    tagInfo.value = {}
    articlePageInfo.value = {}
    initCategoryInfo()
  }
})
</script>

<template>
  <a-card :title="'标签详情：' + tagInfo.name" hoverable class="card-base" :loading="isObjectNull(tagInfo)">
    <a-row :gutter="[0,16]" justify="center">
      <a-col :span="24">
        <div class="top">
          <TextSM>
            创建于：{{ tagInfo.createTime }}
          </TextSM>
          <TextSM>
            关联文章数量：{{ articlePageInfo.total }}
          </TextSM>
        </div>
      </a-col>
      <a-col :span="24">
        <div class="list-main">
          <a-list item-layout="horizontal" :data-source="articlePageInfo.list">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta
                    :description="item.summary">
                  <template #title>
                    <span class="text-hover" @click="goArticle(item.id)" >{{ item.title }}</span>
                  </template>
                  <template #avatar>
                    <a-avatar :src="item.cover" :size="48" shape="square"/>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </div>
      </a-col>
      <a-pagination :total="articlePageInfo.total" v-model:current="articlePageInfo.pageNum"
                    :default-page-size="10" size="small" @change="getArticleList(articlePageInfo.pageNum)"/>
    </a-row>
  </a-card>
</template>

<style scoped lang="scss">
.top{
  display: flex;
  justify-content: space-between;
}
.list-main{
  img{
    max-width: 100% ;
  }
}
</style>