<script setup>

import {onMounted, ref} from "vue";
import {_deleteArtalkPage, _getArtalkPageList, _updateArtalkPageType} from "@/assets/js/api";
import {elMessageBox, elSuccessNot, isArrayNull, isObjectNull} from "@/assets/js/util";

const artalkPageInfo = ref({})
const pageNum = ref(1)
const pageSize = ref(10)

async function getArtalkPageList(){
  artalkPageInfo.value.list = []
  artalkPageInfo.value = await _getArtalkPageList(pageNum.value, pageSize.value);
}
async function handlerSwitchChange(id, adminOnly){
  if (await _updateArtalkPageType(id, adminOnly)){
    elSuccessNot('', '更新成功')
  }
}
async function deleteArtalkPage(id){
  elMessageBox('删除评论页面', '确定删除吗？将会清空该文章下的所以评论！').then(async () => {
    if (await _deleteArtalkPage(id)){
      elSuccessNot('', '删除成功')
      await getArtalkPageList();
    }
  }).catch(() => {
    elMessageBox('', '操作取消')
  })
}
function handlerPageNumChange(){
  getArtalkPageList();
}
function handlerPageSizeChange(){
  pageNum.value = 1;
  getArtalkPageList();
}
onMounted(() => {
  getArtalkPageList();
})
</script>

<template>
  <el-table :data="artalkPageInfo.list" stripe style="width: 100%" size="large" v-loading="isArrayNull(artalkPageInfo.list)">
    <el-table-column prop="title" label="页面标题"/>
    <el-table-column prop="createdAt" label="建立评论区时间" align="center" width="200"/>
    <el-table-column prop="updatedAt" label="最后评论时间" align="center" width="200"/>
    <el-table-column label="页面地址" align="center">
      <template #default="scope">
        <a-typography-link :href="'http://localhost:5173' + scope.row.key">
          http://localhost:5173{{scope.row.key}}
        </a-typography-link>
      </template>
    </el-table-column>
    <el-table-column label="仅管理员可评" align="center" width="160">
      <template #default="scope">
        <el-switch v-model="scope.row.adminOnly" @change="handlerSwitchChange(scope.row.id, scope.row.adminOnly)"/>
      </template>
    </el-table-column>
    <el-table-column prop="siteName" label="站点名称" align="center" width="160"/>
    <el-table-column prop="voteUp" label="点赞数" align="center" width="80"/>
    <el-table-column prop="voteDown" label="点踩数" align="center" width="80"/>
    <el-table-column prop="pv" label="浏览量" align="center" width="80"/>
    <el-table-column label="操作" align="center" width="100">
      <template #default="scope">
        <el-button type="danger" text @click="deleteArtalkPage(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="page-switch">
    <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]"
                   background layout="sizes, prev, pager, next" :total="artalkPageInfo.total"
                   @update:current-page="handlerPageNumChange" @update:page-size="handlerPageSizeChange"/>
  </div>
</template>

<style scoped>

</style>