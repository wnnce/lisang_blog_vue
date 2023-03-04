<script setup>
import "@/assets/css/base.css"
import TextSM from "@/components/TextSM.vue"
import {go404} from "@/assets/js/router";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {_getCategoryInfo, _getArticleListByCategoryId} from "@/assets/js/api";
import {isObjectNull} from "@/assets/js/util";
const route = useRoute();
const id = ref('');
const categoryInfo = ref({});
const articlePageInfo = ref({});
async function initCategoryInfo(){
  categoryInfo.value = await _getCategoryInfo(id.value)
  if (!categoryInfo.value){
    await go404();
  }
  if (categoryInfo.value.articleNum > 0){
    await getArticleList(1)
  }
}
async function getArticleList(pageNum){
  articlePageInfo.value = await _getArticleListByCategoryId(id.value, pageNum)
}
onMounted(() => {
  let tempId = Number(route.params.id);
  if (isNaN(tempId)){
    go404();
  }else{
    id.value = tempId;
    initCategoryInfo();
  }

})
onBeforeRouteUpdate((value) => {
  let tempId = Number(value.params.id)
  if (isNaN(tempId)){
    go404();
  }else{
    id.value = tempId;
    categoryInfo.value = {};
    articlePageInfo.value = {};
    initCategoryInfo();
  }


})
</script>

<template>
  <a-card :title="'分类详情：' + categoryInfo.name" hoverable class="card-base" :loading="isObjectNull(categoryInfo)">
    <a-row :gutter="[0,16]" justify="center">
      <a-col :span="24">
        <div class="top">
          <TextSM>
            创建于：{{categoryInfo.createTime}}
          </TextSM>
          <TextSM>
            关联文章数量：{{articlePageInfo.total ? articlePageInfo.total : 0}}
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
                    <router-link :to="'/article/' + item.id">
                      <span class="text-hover">{{ item.title }}</span>
                    </router-link>
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