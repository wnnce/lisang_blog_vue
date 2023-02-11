<!--Artalk评论管理页面-->
<script setup>

import {onMounted, ref} from "vue";
import {
  _deleteArtalkComment, _getArtalkCommentList, _updateArtalkCommentType} from "@/assets/js/api";
import {elMessageBox, elSuccessNot, isObjectNull} from "@/assets/js/util";

const pageNum = ref(1)
const pageSize = ref(10)
const commentPageInfo = ref([])


async function getArtalkCommentList(){
  commentPageInfo.value = await _getArtalkCommentList(pageNum.value, pageSize.value);
}
async function updateArtalkCommentType(id, isCollapsed, isPending, isPinned){
  if (await _updateArtalkCommentType(id, isCollapsed, isPending, isPinned)){
    elSuccessNot('', '更新成功');
  }
}
async function deleteArtalkComment(id){
  elMessageBox('删除评论页面', '确定删除吗？将会清空该文章下的所以评论！').then(async () => {
    if (await _deleteArtalkComment(id)){
      elSuccessNot('', '删除成功')
      await getArtalkCommentList()
    }
  }).catch(() => {
    elMessageBox('', '操作取消')
  })
}
function handlerPageNumChange(){
  getArtalkCommentList();
}
function handlerPageSizeChange(){
  pageNum.value = 1;
  getArtalkCommentList();
}
onMounted(() => {
  getArtalkCommentList();
})
</script>

<template>
  <el-table :data="commentPageInfo.list" stripe style="width: 100%" size="large" v-loading="isObjectNull(commentPageInfo)">
    <el-table-column type="expand" label="详情" width="60">
      <template #default="props">
        <div style="padding: 20px">
          <p>文章标题：{{props.row.pageTitle}}</p>
          <p>文章地址： <a-typography-link :href="'http://localhost:5173' + props.row.pageKey ">
            http://localhost:5173{{props.row.pageKey}}
          </a-typography-link></p>
          <p>UA：{{props.row.ua}}</p>
          <p v-if="props.row.superComment">
            上一级评论：用户<a-typography-text code>{{props.row.superComment.username}}</a-typography-text>的评论：
            <a-typography-text type="secondary">{{props.row.superComment.content}}</a-typography-text>
          </p>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="content" label="评论内容"/>
    <el-table-column prop="createdAt" label="评论时间" align="center" />
    <el-table-column prop="updatedAt" label="更新时间" align="center" />
    <el-table-column prop="username" label="评论用户" align="center" width="160"/>
    <el-table-column prop="ip" label="IP" align="center" />
    <el-table-column label="二级评论" align="center" width="120">
      <template #default="scope">
        {{scope.row.rid === 0 ? '否' : '是'}}
      </template>
    </el-table-column>
    <el-table-column label="折叠" align="center" width="80">
      <template #default="scope">
        <el-switch
            v-model="scope.row.isCollapsed"
            @change="updateArtalkCommentType(scope.row.id, scope.row.isCollapsed, scope.row.isPending, scope.row.isPinned)"
        />
      </template>
    </el-table-column>
    <el-table-column label="审核" align="center" width="80">
      <template #default="scope">
        <el-switch
            v-model="scope.row.isPending"
            @change="updateArtalkCommentType(scope.row.id, scope.row.isCollapsed, scope.row.isPending, scope.row.isPinned)"
        />
      </template>
    </el-table-column>
    <el-table-column label="置顶" align="center" width="80">
      <template #default="scope">
        <el-switch
            v-model="scope.row.isPinned"
            @change="updateArtalkCommentType(scope.row.id, scope.row.isCollapsed, scope.row.isPending, scope.row.isPinned)"
        />
      </template>
    </el-table-column>
    <el-table-column prop="voteUp" label="点赞数" align="center" width="80"/>
    <el-table-column prop="voteDown" label="点踩数" align="center" width="80"/>
    <el-table-column label="操作" align="center" width="80">
      <template #default="scope">
        <el-button type="danger" text @click="deleteArtalkComment(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="page-switch">
    <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]"
                   background layout="sizes, prev, pager, next" :total="commentPageInfo.total"
                   @update:current-page="handlerPageNumChange" @update:page-size="handlerPageSizeChange"/>
  </div>
</template>

<style scoped>

</style>