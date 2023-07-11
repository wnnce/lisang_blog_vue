<!--文章列表中的文章组件-->
<script setup>

import "@/assets/css/base.css"
import {DashboardFilled, FolderFilled, TagFilled} from "@ant-design/icons-vue";
import TextSM from "@/components/TextSM.vue";
import {computed, ref} from "vue";
import {useRouter} from "vue-router";

const value = defineProps(['index', 'article'])
const router = useRouter()
const isIndex = computed(() => {
  return value.index % 2 === 0
})

const tagList = computed(() => {
  return value.article.labelList.filter(item => {
    return item.flag === 1;
  })
})

const categoryList = computed(() => {
  return value.article.labelList.filter(item => {
    return item.flag === 2;
  })
})

</script>

<template>
  <a-card hoverable class="card-base" :body-style="{padding: '0'}" :loading="!article">
    <a-row>
      <a-col :span="14" :push="isIndex ? 10 : 0">
        <div class="post" >
          <a-space align="start" direction="vertical" :size="2">
            <router-link :to="'/article/' + article.id">
              <h2 class="text-hover">{{article.title}}</h2>
            </router-link>
            <TextSM>
              <dashboard-filled style="color: #204969" class="list-icon" />
              {{article.createTime}}
            </TextSM>
            <TextSM v-if="categoryList">
              <folder-filled class="list-icon" style="color: #ea7070" />
              <router-link :to="'/category/' + category.id" v-for="category in categoryList" :key="category.id">
                <span class="a-text text-hover">{{category.name}}</span>
              </router-link>
            </TextSM>
            <TextSM v-if="tagList">
              <tag-filled class="list-icon" style="color: #9dd3a8" />
              <router-link :to="'/tag/' + tag.id" v-for="tag in tagList" :key="tag.id">
                <span class="a-text text-hover">{{tag.name}}</span>
              </router-link>
            </TextSM>
            <div class="post-summary">
              <a-typography-text type="secondary">{{article.summary}}</a-typography-text>
            </div>
          </a-space>
        </div>
      </a-col>
      <a-col :span="10" :pull="isIndex ? 14 : 0">
        <div class="div-img" :class="isIndex ? 'img-left' : 'img-right'" :style="{backgroundImage: 'url(' + article.cover + ')'}">
          <div class="background-image-filter" :class="isIndex ? 'img-left' : 'img-right'"></div>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<style scoped lang="scss">
.post{
  padding: 24px;
  min-height: 200px;
  h2{
    font-size: 24px;
    font-weight: 400;
  }
  .a-text{
    padding: 2px;
    color: #999;
  }
  .post-summary{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
}
.div-img{
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: all 500ms;
  .background-image-filter{
    width: 100%;
    height: 100%;
    transition: all 300ms;
  }
  &:hover{
    background-size: 150%;
  }
}
.img-left{
  border-radius: 12px 0 0 12px;
}
.img-right{
  border-radius: 0 12px 12px 0;
}
</style>