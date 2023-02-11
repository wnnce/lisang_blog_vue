<script setup>
import "@/assets/css/base.css"
import { GithubOutlined, SoundOutlined, MailOutlined, AppstoreOutlined, PaperClipOutlined,
  SearchOutlined, TagsOutlined, FolderOpenOutlined, LikeOutlined } from "@ant-design/icons-vue";
import CategoryItem from "@/components/CategoryItem.vue";
import Footer from "@/components/Footer.vue";
import LinkImg from "@/components/LinkLogo.vue";
import {isArrayNull, randomColor} from "@/assets/js/util";
import {onActivated, onMounted, ref} from "vue";
import {
  _getCategoryListByNormal, _getUserLinkListByNormal, _getTagListByNormal,
  _searchArticleTitle, _getArticleTop} from "@/assets/js/api";
import {goTag, goAbout, goArticle, goHome, goLinks} from "@/assets/js/router";
import {useDataStore} from "@/stores/dataStore";
const store = useDataStore()
const searchValue = ref('')
const options = ref([])
const links = ref([])
const tagList = ref([])
const categoryList = ref([])
const articleTop = ref([])
async function onSearch(e){
  if (e){
    options.value = []
    let names = await _searchArticleTitle(e)
    for(let i = 0; i < names.length; i ++){
      options.value = options.value.concat({value: names[i].id + '.' + names[i].title})
    }
  }
}
function onSelect(e){
  let id = e.substring(0, e.indexOf('.'))
  options.value = []
  searchValue.value = ''
  goArticle(id)
}
async function getArticleTop(){
  articleTop.value = await _getArticleTop();
}
async function initIndex(){
  links.value = await _getUserLinkListByNormal();
  tagList.value = await _getTagListByNormal();
  categoryList.value = await _getCategoryListByNormal();
}

onMounted(() => {
  initIndex();
})
onActivated(() => {
  getArticleTop();
})
</script>

<template>
  <div class="home">
    <a-row justify="center" :gutter="[{ xs: 8, sm: 8, md: 12, lg: 24 }, { xs: 8, sm: 8, md: 12, lg: 24 }]">
      <a-col :xxl="4" :xl="{span: 5, order: 1}" :md="{span: 6, order: 1}" :xs="{span: 22, order: 3}">
        <div class="left">
          <a-row :gutter="[0,{ xs: 8, sm: 8, md: 12, lg: 24 }]">
            <a-col :span="24">
              <a-card hoverable class="card-base">
                <div class="user">
                  <a-space direction="vertical" style="width: 100%">
                    <a-avatar :size="96" @click="goHome" :src="store.user.avatar" />
                    <a-typography-link @click="goHome">
                      <a-typography-title :level="4" class="text-hover">{{store.user.author}}</a-typography-title>
                    </a-typography-link>
                    <a-row justify="space-around">
                      <a-col :span="4">文章<br>{{store.articleNum}}</a-col>
                      <a-col :span="4">分类<br>{{categoryList.length}}</a-col>
                      <a-col :span="4">标签<br>{{tagList.length}}</a-col>
                    </a-row>
                    <a-button type="primary" block href="https://github.com/wnnce" target="_blank">
                      <template #icon><github-outlined /></template>
                      Github
                    </a-button>
                    <div class="links">
                      <LinkImg v-for="link in links" :key="link.id" :href="link.url" :src="link.logoUrl" />
                    </div>
                  </a-space>
                </div>
              </a-card>
            </a-col>
            <a-col :span="24">
              <a-card hoverable class="card-base" title="公告栏">
                <template #extra><sound-outlined style="color: #ff6768; font-size: 24px"/></template>
                <p>{{store.setting.notice}}</p>
              </a-card>
            </a-col>
            <a-col :span="24">
              <a-card hoverable class="card-base" title="标签" :loading="isArrayNull(tagList)">
                <template #extra><tags-outlined style="color: #9dd3a8; font-size: 24px"/></template>
                <div class="tags">
                  <a-typography-link @click="goTag(tag.id)" v-for="tag in tagList" :key="tag.id">
                    <a-tag :color="randomColor()" style="font-size: 12px; margin-bottom: 6px">{{tag.name}}</a-tag>
                  </a-typography-link>
                </div>
              </a-card>
            </a-col>
            <a-col :span="24">
              <a-card hoverable style="border-radius: 12px; cursor: auto" title="站点链接">
                <template #extra><paper-clip-outlined style="color: #5bd1d7; font-size: 24px"/></template>
                <a-menu mode="horizontal" :selectable="false" style="justify-content: space-around">
                  <a-menu-item key="mail" @click="goAbout">
                    <template #icon>
                      <mail-outlined />
                    </template>
                    关于
                  </a-menu-item>
                  <a-menu-item key="app" @click="goLinks()">
                    <template #icon>
                      <appstore-outlined />
                    </template>
                    友情链接
                  </a-menu-item>
                </a-menu>
              </a-card>
            </a-col>
          </a-row>
        </div>
      </a-col>
      <a-col :xxl="10" :xl="{span: 12, order: 2}" :md="{span: 16, order: 2}" :xs="{span: 22, order: 1}" >
        <div class="main">
          <router-view v-slot="{ Component }">
            <keep-alive :include="['Home', 'Categories', 'Tags', 'About', 'Links']">
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
      </a-col>
        <a-col :xxl="4" :xl="{span: 5, order: 3}" :md="0" :xs="{span: 22, order: 2}">
          <div class="right">
            <a-row :gutter="[0, { xs: 8, sm: 8, md: 12, lg: 24 }]">
              <a-col :span="24">
                <a-card hoverable class="card-base" title="搜索">
                  <template #extra><search-outlined style="color: #1794A5; font-size: 24px"/></template>
                  <a-auto-complete
                      v-model:value="searchValue"
                      :options="options"
                      style="width: 100%"
                      @search="onSearch"
                      @select="onSelect">
                    <a-input :bordered="false" placeholder="根据文章标题搜索..."/>
                  </a-auto-complete>
                </a-card>
              </a-col>
              <a-col :span="24">
                <a-card hoverable class="card-base" title="热门文章" :loading="isArrayNull(articleTop)">
                  <template #extra><like-outlined style="color: #e41749; font-size: 24px"/></template>
                  <a-list :data-source="articleTop">
                    <template #renderItem="{ item }">
                      <a-list-item>{{ item }}</a-list-item>
                    </template>
                  </a-list>
                </a-card>
              </a-col>
              <a-col :span="24">
                <a-card hoverable class="card-base" title="分类" :loading="isArrayNull(categoryList)">
                  <template #extra><folder-open-outlined  style="color: #ea7070; font-size: 24px"/></template>
                  <CategoryItem v-for="category in categoryList" :key="category.id" :category="category"></CategoryItem>
                </a-card>
              </a-col>

            </a-row>
          </div>
        </a-col>
    </a-row>
    <a-row justify="center">
      <a-col :xxl="10" :xl="{span: 12, offset: 0}" :md="{span: 16, offset: 6}" :xs="22">
        <a-divider />
        <Footer></Footer>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="scss">
.home{
  padding: 32px 0;
  .left{
    .user{
      text-align: center;
      .links{
        overflow-wrap: break-word;
      }
    }
  }
  .right{
    .tags{
    }
  }
}
</style>