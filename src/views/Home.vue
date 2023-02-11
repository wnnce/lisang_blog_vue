<script setup>
import PostItem from "@/components/PostItem.vue";
import {onMounted, ref} from "vue";
import {_getArticleListByNormal} from "@/assets/js/api";
import {useDataStore} from "@/stores/dataStore";
import {goTop} from "@/assets/js/util";

const articlePageInfo = ref({});
const pageNum = ref(1);
const store = useDataStore()
async function initPageData(){
  goTop();
  articlePageInfo.value = await _getArticleListByNormal(pageNum.value);
  store.articleNum = articlePageInfo.value.total;
}
onMounted(() => {
  initPageData()
})
</script>
<template>
  <a-row :gutter="[0, { xs: 8, sm: 8, md: 12, lg: 24 }]" justify="center">
    <a-col :span="24" v-for="(article, index) in articlePageInfo.list" >
      <PostItem :key="article.id" :index="index" :article="article" />
    </a-col>
    <a-pagination :total="articlePageInfo.total" v-model:current="pageNum" size="small"
                  :default-page-size="5" @change="initPageData"></a-pagination>
  </a-row>
</template>

<style scoped>

</style>