<script setup>
import {SearchOutlined, PlusOutlined, LeftOutlined} from "@ant-design/icons-vue";
import { onMounted, ref} from "vue";
import {
  elMessageBox,
  elMessageNot,
  elSuccessNot,
  handlerCopySuccess,
  idArrayForMatObject,
  isObjectNull,
  listForMatOptions,
  listForMatOptionsItem
} from "@/assets/js/util";
import LogoUpload from "@/components/LogoUpload.vue";
import {_fileUpload, _getArticleInfo, _getArticleList, _deleteArticle, _saveArticle, _updateArticle,
  _getCategoryListByNormal, _getTagListByNormal, _updateArticleType} from "@/assets/js/api";

const keyWord = ref(null);
const pageNum = ref(1);
const pageSize = ref(10);
const isAddAndEdit = ref(false);
const title = ref('');
const articleInfo = ref({});
const categoryOptions = ref([])
const tagOptions = ref([])
const articlePageInfo = ref({})
function addArticle(){
  if (articleInfo.value.id){
    articleInfo.value = {};
  }
  initOptions();
  title.value = '新增文章';
  isAddAndEdit.value = true;
}
async function editArticle(id){
  articleInfo.value = await _getArticleInfo(id);
  articleInfo.value.tagList = listForMatOptionsItem(articleInfo.value.tagList);
  articleInfo.value.categoryList = listForMatOptionsItem(articleInfo.value.categoryList);
  title.value = '修改文章';
  await initOptions();
  isAddAndEdit.value = true;
}
async function getArticleList(){
  articlePageInfo.value = await _getArticleList(pageNum.value, pageSize.value, keyWord.value);
}
function updateArticleStatus(id, bl, status){
  let message, newStatus;
  status === 1 ? message = '撤销发布后，博客上将不会显示该文章！' : message = '确定发布该文章到博客吗？'
  status === 1 ? newStatus = 0 : newStatus = 1;
  elMessageBox('提示', message).then(async () => {
    if(await _updateArticleType(id, bl, newStatus)){
      elSuccessNot('', status === 1 ? '撤销发布成功' : '发布文章成功')
      await getArticleList();
    }
  }).catch(() => {
    elMessageNot('', '操作取消')
  })
}
function deleteArticle(id){
  elMessageBox('删除文章', '确定删除该文章吗，删除文章的同时会删除所有评论！').then(async () => {
    if(await _deleteArticle(id)){
      elSuccessNot('', '删除文章成功');
      await getArticleList();
    }
  }).catch(() => {
    elMessageNot('', '取消删除')
  })
}

async function submitForm(){
  articleInfo.value.tagList = idArrayForMatObject(articleInfo.value.tagList);
  articleInfo.value.categoryList = idArrayForMatObject(articleInfo.value.categoryList);
  if (articleInfo.value.id){
    if (await _updateArticle(articleInfo.value)){
      successMessage('更新成功！')
      articleInfo.value = {}
    }
  } else {
    if(await _saveArticle(articleInfo.value)){
      successMessage('保存成功!')
      articleInfo.value = {}
    }
  }
}
function successMessage(message){
  elSuccessNot('', message)
  isAddAndEdit.value = false;
  getArticleList();
}
function exit(){
  elMessageBox('提示', '确定取消保存并退出吗？所有编辑都不会生效！').then(() => {
    isAddAndEdit.value = false;
    articleInfo.value = {};
  }).catch(() => {
    elMessageNot('', '操作取消')
  })
}
async function initOptions(){
  let categoryRes = await _getCategoryListByNormal();
  categoryOptions.value = listForMatOptions(categoryRes)
  let tagRes = await _getTagListByNormal();
  tagOptions.value = listForMatOptions(tagRes)
}
function handlerSearch(){
  if (keyWord.value === ''){
    keyWord.value = null;
  }
  pageNum.value = 1;
  getArticleList();
}
async function handlerSwitchChange(id, bl, status){
  let message = '';
  bl ? message = '开启成功' : message = '关闭成功'
  if (await _updateArticleType(id, bl, status)){
    elSuccessNot('', message)
  }
}
async function handlerImageUpload(event, insertImage, files){
  let url = await _fileUpload(files[0])
  if (url){
    elSuccessNot('', '图片上传成功！');
    insertImage({
      url: url
    })
  }
}
function handlerPageNumChange(){
  getArticleList()
}
function handlerPageSizeChange(){
  pageNum.value = 1;
  getArticleList()
}
onMounted(() => {
  getArticleList();
})
</script>

<template>
  <div v-if="isAddAndEdit">
    <el-row justify="center">
      <el-col :span="24">
        <div style="text-align: center; margin-bottom: 12px">
          <a-typography-title :level="2" style="display: inline-block">{{title}}</a-typography-title>
          <a-typography-text style="float: left" class="text-hover" @click="isAddAndEdit = false">
            <left-outlined />
            返回
          </a-typography-text>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form size="large" label-width="90px" label-position="top">
          <el-form-item label="文章标题" required>
            <el-input v-model="articleInfo.title" maxlength="40" placeholder="文章标题，最长40个字" clearable
                      type="textarea" :autosize="{minRows: 1, maxRows: 3}" show-word-limit />
          </el-form-item>
          <el-form-item label="文章简介" required>
            <el-input v-model="articleInfo.summary" maxlength="100" placeholder="文章简介，最长100个字" clearable
                      type="textarea" :autosize="{minRows: 2, maxRows: 5}" show-word-limit />
          </el-form-item>
          <el-form-item label="文章封面" required>
            <el-input v-model="articleInfo.cover" type="hidden"/>
            <LogoUpload v-model:image-url="articleInfo.cover" :size="['200px', '120px']"></LogoUpload>
          </el-form-item>
          <el-form-item label="文章分类">
            <el-select-v2 v-model="articleInfo.categoryList" :options="categoryOptions" placeholder="选择文章分类，可多选"
                          style="width: 100%" multiple clearable/>
          </el-form-item>
          <el-form-item label="文章标签">
            <el-select-v2 v-model="articleInfo.tagList" :options="tagOptions" placeholder="选择文章标签，可多选"
                          style="width: 100%" multiple clearable/>
          </el-form-item>
          <div class="form-button">
            <el-button type="primary" @click="submitForm" style="width: 120px">保 存</el-button>
            <el-button type="danger" @click="exit" style="width: 120px">取 消</el-button>
          </div>
        </el-form>
      </el-col>
      <el-col :span="17" :offset="1">
        <v-md-editor v-model="articleInfo.content" height="720px" :disabled-menus="[]"
                     @upload-image="handlerImageUpload" @copy-code-success="handlerCopySuccess"/>
      </el-col>
    </el-row>
  </div>
  <div v-else>
    <div class="list-tool">
      <el-input
          v-model="keyWord"
          size="large"
          style="width: 220px"
          placeholder="根据文章标题搜索">
        <template #append>
          <el-button :icon="SearchOutlined" @click="handlerSearch"/>
        </template>
      </el-input>
      <el-button type="primary" size="large" @click="addArticle">
        <el-icon><plus-outlined class="el-icon--left"/></el-icon>
        新增文章
      </el-button>
    </div>
    <el-table :data="articlePageInfo.list" stripe style="width: 100%" v-loading="isObjectNull(articlePageInfo)">
      <el-table-column type="expand" label="详情" width="60">
        <template #default="props">
          <div style="width: 800px; padding: 20px">
            <el-descriptions size="large" :column="1" border>
              <el-descriptions-item label="文章简介：">
                {{props.row.summary}}
              </el-descriptions-item>
              <el-descriptions-item label="文章分类：">
                {{props.row.categoryList?.map(category => {return category.name})}}
              </el-descriptions-item>
              <el-descriptions-item label="文章标签：">
                {{props.row.tagList?.map(tag => {return tag.name})}}
              </el-descriptions-item>
              <el-descriptions-item label="文章封面：" />
              <el-descriptions-item>
                <el-image fit="contain" :src="props.row.cover" style="height: 200px; width: 400px"></el-image>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="文章标题">
        <template #default="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="分类" align="center" width="100">
        <template #default="scope">
          {{scope.row.categoryList ? scope.row.categoryList.length : 0}}个
        </template>
      </el-table-column>
      <el-table-column label="标签" align="center" width="100">
        <template #default="scope">
          {{scope.row.tagList ? scope.row.tagList.length : 0}}个
        </template>
      </el-table-column>
      <el-table-column label="点击数" align="center" width="120">
        <template #default="scope">
          {{scope.row.clickNum}}
        </template>
      </el-table-column>
      <el-table-column label="评论" align="center" width="100">
        <template #default="scope">
          <el-switch v-model="scope.row.isComment"
                     @change="handlerSwitchChange(scope.row.id, scope.row.isComment, scope.row.status)"/>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="发表时间" align="center" width="220"/>
      <el-table-column prop="updateTime" label="最后更新时间" align="center" width="220"/>
      <el-table-column label="状态" align="center" width="80">
        <template #default="scope">
          {{scope.row.status === 1 ? '已发布' : '待发布'}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template #default="scope">
          <el-button type="primary" text @click="editArticle(scope.row.id)">修改</el-button>
          <el-button type="warning" text
                     @click="updateArticleStatus(scope.row.id, scope.row.isComment, scope.row.status)">
            {{scope.row.status === 1 ? '撤销发布' : '发布文章'}}
          </el-button>
          <el-button type="danger" text @click="deleteArticle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-switch">
      <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]"
                     background layout="sizes, prev, pager, next" :total="articlePageInfo.total"
                     @update:current-page="handlerPageNumChange" @update:page-size="handlerPageSizeChange"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-tool{
  display: flex;
  justify-content: space-between;
  padding: 0 0 12px 0;
}
</style>