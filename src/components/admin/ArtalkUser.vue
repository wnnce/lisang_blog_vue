<script setup>

import {onMounted, ref} from "vue";
import {_deleteArtalkUser, _getArtalkUserList} from "@/assets/js/api";
import {elMessageBox, elSuccessNot, isArrayNull, isObjectNull, uaHandler} from "@/assets/js/util";

const pageNum = ref(1);
const pageSize = ref(10)
const userPageInfo = ref([])

async function getArtalkUserList(){
  userPageInfo.value.list = [];
  userPageInfo.value = await _getArtalkUserList(pageNum.value, pageSize.value);
}
function deleteArtalkUser(id){
  elMessageBox('删除用户', '确定删除吗？将会删除用户信息并清空相关评论！').then(async () => {
    if (await _deleteArtalkUser(id)){
      elSuccessNot('', '删除成功')
      await getArtalkUserList();
    }
  }).catch(() => {
    elMessageBox('', '操作取消')
  })
}
function handlerPageNumChange(){
  getArtalkUserList();
}
function handlerPageSizeChange(){
  pageNum.value = 1;
  getArtalkUserList();
}
onMounted(() => {
  getArtalkUserList();
})
</script>

<template>
  <el-table :data="userPageInfo.list" stripe style="width: 100%" size="default" v-loading="isArrayNull(userPageInfo.list)">
    <el-table-column prop="name" label="用户名"/>
    <el-table-column prop="email" label="邮箱" align="center"/>
    <el-table-column prop="link" label="网址" align="center"/>
    <el-table-column prop="createdAt" label="创建时间" align="center" />
    <el-table-column prop="updatedAt" label="最后活跃时间" align="center" />
    <el-table-column label="标签" align="center" width="80">
      <template #default="scope">
        <el-tag v-if="scope.row.badgeName" style="color: white" :color="scope.row.badgeColor">{{scope.row.badgeName}}</el-tag>
        <span v-else>无</span>
      </template>
    </el-table-column>
    <el-table-column prop="lastIp" label="最后使用IP" align="center"/>
    <el-table-column label="最后使用UA" align="center">
      <template #default="scope">
        {{uaHandler(scope.row.lastUa)}}
      </template>
    </el-table-column>
    <el-table-column label="管理员" align="center" width="120">
      <template #default="scope">
        {{scope.row.isAdmin ? '是' : '否'}}
      </template>
    </el-table-column>
    <el-table-column label="修改配置" align="center" width="80">
      <template #default="scope">
        {{scope.row.isInConf ? '是' : '否'}}
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" width="80">
      <template #default="scope">
        <el-button type="danger" text :disabled="scope.row.isAdmin" @click="deleteArtalkUser(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="page-switch">
    <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]"
                   background layout="sizes, prev, pager, next" :total="userPageInfo.total"
                   @current-change="handlerPageNumChange" @size-change="handlerPageSizeChange"/>
  </div>
</template>

<style scoped>

</style>