<script setup>
import "@/assets/css/base.css"
import {filterLabelList, handlerCopySuccess, isObjectNull} from "@/assets/js/util";
import { DashboardFilled, ClockCircleFilled, FolderFilled, TagFilled, FileWordFilled, EyeFilled,
  ArrowLeftOutlined } from "@ant-design/icons-vue";
import TextSM from "@/components/TextSM.vue"
import {computed, onMounted, reactive, ref} from "vue";
import Footer from "@/components/Footer.vue";
import 'prismjs/themes/prism.min.css'
import {useRoute} from "vue-router";
import {_getArticleInfoByNormal} from "@/assets/js/api";
import Artalk from "@/components/Artalk.vue";
import {goBack, go404} from "@/assets/js/router";
import {useDataStore} from "@/stores/dataStore";
const store = useDataStore();
const route = useRoute();
const tagList = ref([]);
const categoryList = ref([]);
const articleInfo = reactive({
  article: {},
  up: {},
  down: {}
});
const contentNum = ref('')

const readTime = computed(() => {
  return Math.round(contentNum.value / 400)
})
const isDown = computed(() => {
  return JSON.stringify(articleInfo.down) !== '{}';
})
const isUp = computed(() => {
  return JSON.stringify(articleInfo.up) !== '{}';
})
const currPageUrl = computed(() => {
  return window.location.href;
})
function clearArticleInfo(){
  articleInfo.article = {};
  articleInfo.up = {};
  articleInfo.down = {};
}
async function getArticleInfo(id){
  window.scrollTo(0 ,0)
  clearArticleInfo();
  let articleRes = await _getArticleInfoByNormal(id)
  if (!articleRes){
    await go404();
  }
  if (articleRes.article){
    articleInfo.article = articleRes.article;
    contentNum.value = articleInfo.article.content.length;
    tagList.value = filterLabelList(articleRes.article.labelList, 1);
    categoryList.value = filterLabelList(articleRes.article.labelList, 2);
  }
  if (articleRes.up){
    articleInfo.up = articleRes.up;
  }
  if (articleRes.down) {
    articleInfo.down = articleRes.down;
  }
}
onMounted(() => {
  let id = Number(route.params.id);
  if (isNaN(id)){
    go404()
  }else {
    getArticleInfo(id)
    Prism.highlightAll();
  }
})
</script>

<template>
  <div class="article-top" :style="{backgroundImage: 'url(' + articleInfo.article.cover + ')'}"
       v-loading="isObjectNull(articleInfo.article)">
    <div class="image-filter">
      <div class="back-index">
        <a-typography-text class="text-hover" @click="goBack()" style="color: white">
          <arrow-left-outlined/>
          返回首页
        </a-typography-text>
      </div>
      <div class="article-info">
        <a-typography-title level="4">{{articleInfo.article.title}}</a-typography-title>
        <TextSM style="color: white">
          <dashboard-filled class="article-icon"/>
          发布于：{{articleInfo.article.createTime}}
        </TextSM>
        <TextSM style="color:white; margin-left: 12px">
          <clock-circle-filled class="article-icon" />
          最后更新：{{articleInfo.article.updateTime}}
        </TextSM>
        <TextSM style="color:white; margin-left: 12px">
          <eye-filled class="article-icon"/>
          点击数：{{articleInfo.article.clickNum}}
        </TextSM>
        <br>
        <TextSM style="color: white" v-if="categoryList">
          <folder-filled class="article-icon" />
          <span class="category-item" v-for="category in categoryList"
                :key="category.id">{{category.name}}</span>
        </TextSM>
        <TextSM style="color:white; margin-left: 12px" v-if="tagList">
          <tag-filled class="article-icon" />
          <span class="tag-item" v-for="tag in tagList" :key="tag.id">{{tag.name}}</span>
        </TextSM>
        <br>
        <TextSM style="color: white">
          <file-word-filled class="article-icon"/>
          字数总计：{{contentNum}} 字
        </TextSM>
        <TextSM style="color:white; margin-left: 12px">
          <eye-filled class="article-icon"/>
          阅读时间：{{readTime}} 分钟
        </TextSM>
      </div>
    </div>
  </div>
  <div class="article-main">
    <a-card hoverable class="card-base" style="margin: 32px 0" :loading="isObjectNull(articleInfo.article)">
      <div class="article-content">
        <v-md-editor :model-value="articleInfo.article.content" mode="preview" @copy-code-success="handlerCopySuccess" />
        <a-divider />
        <div class="article-other">
          <div class="license">
            <a-typography-title :level="5">许可协议</a-typography-title>
            <TextSM style="font-size: 14px">
              文章链接： <a-typography-link>{{currPageUrl}}</a-typography-link>，
              使用 <a-typography-text code>{{store.setting.protocol}}</a-typography-text> 许可协议，转载请声明出处！
            </TextSM>
          </div>
          <a-row justify="center">
            <a-col :md="isDown ? 12 : 24" :xs="24">
              <div class="relevant-post" :style="{backgroundImage: 'url(' + articleInfo.up.cover + ')'}" v-if="isUp">
                <div class="image-filter">
                  <div class="text left">
                    <TextSM style="color: white">上一篇</TextSM><br>
                    <a-typography-text style="color: white" class="text-hover" @click="getArticleInfo(articleInfo.up.id)">
                      {{articleInfo.up.title}}
                    </a-typography-text>
                  </div>
                </div>
              </div>
            </a-col>
            <a-col :md="isUp ? 12 : 24" :xs="24">
              <div class="relevant-post" :style="{backgroundImage: 'url(' + articleInfo.down.cover + ')'}" v-if="isDown">
                <div class="image-filter">
                  <div class="text right">
                    <TextSM style="color: white">下一篇</TextSM><br>
                    <a-typography-text style="color: white" class="text-hover" @click="getArticleInfo(articleInfo.down.id)">
                      {{articleInfo.down.title}}
                    </a-typography-text>
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-card>
    <a-back-top />
    <Artalk :title="articleInfo.article.title" v-if="articleInfo.article.title && articleInfo.article.isComment"
            placeholder="留下你的评论吧..."/>
    <div class="article-footer">
      <a-divider/>
      <Footer></Footer>
    </div>
  </div>
</template>
<style scoped lang="scss">
.image-filter{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  backdrop-filter: brightness(70%);
}
.image-filter:hover{
  animation-name: image-filter;
  animation-duration: 300ms;
  animation-fill-mode: forwards;
}
.article-top{
  width: 100%;
  height: 360px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .back-index{
    margin: 1.5% 0 0 1.5%;
  }
  .article-info{
    padding-bottom: 24px;
    margin: auto 10% 0 10%;
    z-index: 1;
    h1{
      color: rgba(255, 255, 255, 0.9);
    }
    .category-item, .tag-item{
      padding: 0 4px;
    }
  }
}
.article-main{
  width: 1000px;
  margin: 0 auto;
  .article-content{
    padding: 24px;
    .article-other{
      padding: 12px;
      .license{
        padding: 20px;
        margin: 8px 0 48px 0;
        border: 1px solid rgba(245, 245, 245, 0.98);
        border-radius: 8px;
        background-color: rgba(245, 245, 245, 0.98);
      }
      .relevant-post{
        width: 100%;
        height: 120px;
        display: flex;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        .text{
          margin: auto 0;
          width: 100%;
        }
        .left{
          padding-left: 12%;
        }
        .right{
          padding-right: 12%;
          text-align: end;
        }
      }
    }
  }
}
.article-footer{
  padding-bottom: 32px;
}
@media (max-width: 760px) {
  .article-main{
    .article-content {
      padding: 0;
      .article-other{
        padding: 0;
      }
    }
  }
}
@media (max-width: 1040px) {
  .article-main{
    width: 90%;
  }
}
@keyframes image-filter {
  to {backdrop-filter: brightness(90%)}
}
</style>