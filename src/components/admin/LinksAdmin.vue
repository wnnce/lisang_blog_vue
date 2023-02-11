<script setup>
import '@/assets/css/base.css'
import {onMounted, ref} from "vue";
import {PlusOutlined} from "@ant-design/icons-vue";
import {_deleteLink, _getLinkList, _saveLink, _updateLink, _updateLinkType} from "@/assets/js/api";
import {elMessageBox, elMessageNot, elSuccessNot, isArrayNull} from "@/assets/js/util";
const linkList = ref([]);
const editLink = ref({});
const isEditAndAdd = ref(false);
const dialogTitle = ref('');
async function getLinkList(){
  linkList.value = await _getLinkList();
}
function addLink(){
  editLink.value = {};
  dialogTitle.value = "新增友链"
  isEditAndAdd.value = true;
}
function showUpdateLink(link){
  editLink.value = JSON.parse(JSON.stringify(link));
  dialogTitle.value = "修改友链";
  isEditAndAdd.value = true;
}
async function updateLink(){
  if(await _updateLink(editLink.value)){
    elSuccessNot('', '更新成功');
    isEditAndAdd.value = false
    await getLinkList();
  }
}
async function savaLink(){
  if(await _saveLink(editLink.value)){
    elSuccessNot('', '保存成功');
    isEditAndAdd.value = false
    await getLinkList();
  }
}
async function deleteLink(id){
  elMessageBox('删除友链', '确定要删除吗？').then(async () => {
    if (await _deleteLink(id)){
      elSuccessNot('', '删除成功');
      await getLinkList();
    }
  }).catch(() => {
    elMessageNot('', '操作取消')
  })
}
async function updateLinkType(id, bl){
  if(await _updateLinkType(id, bl)){
    elSuccessNot('', '更新成功');
  }
}
function onSubmit(){
  if (editLink.value.id){
    updateLink();
  }else{
    savaLink();
  }
}
onMounted(() => {
  getLinkList();
})
</script>

<template>
  <el-dialog v-model="isEditAndAdd" :title="dialogTitle" width="540"
             style="padding: 12px; text-align: center" destroy-on-close>
    <el-form :model="editLink" label-width="80px" label-position="top">
      <el-form-item label="站点标题" size="large" prop="title" required>
        <el-input v-model="editLink.title"></el-input>
      </el-form-item>
      <el-form-item label="站点简介" size="large" prop="summary">
        <el-input v-model="editLink.summary"></el-input>
      </el-form-item>
      <el-form-item label="用户名" size="large" prop="username">
        <el-input v-model="editLink.username"></el-input>
      </el-form-item>
      <el-form-item label="站点链接" size="large" prop="url" required>
        <el-input v-model="editLink.url"></el-input>
      </el-form-item>
      <el-form-item label="Logo链接" size="large" prop="logoUrl">
        <el-input v-model="editLink.logoUrl"></el-input>
      </el-form-item>
      <el-button type="primary" size="large" @click="onSubmit">保存</el-button>
      <el-button type="default" size="large" @click="isEditAndAdd = false">取消</el-button>
    </el-form>
  </el-dialog>
  <div class="list-tool">
    <el-button type="primary" size="large" @click="addLink">
      <el-icon><plus-outlined class="el-icon--left"/></el-icon>
      新增友链
    </el-button>
  </div>
  <el-table :data="linkList" stripe style="width: 100%" size="large">
    <el-table-column prop="title" label="站点标题" width="200"/>
    <el-table-column prop="summary" label="站点简介" align="center" width="300"/>
    <el-table-column prop="username" label="用户" align="center"/>
    <el-table-column prop="url" label="站点链接" align="center"/>
    <el-table-column prop="logoUrl" label="Logo" align="center">
      <template #default="scope">
        <el-avatar shape="square" :src="scope.row.logoUrl" />
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" align="center"/>
    <el-table-column prop="updateTime" label="更新时间" align="center"/>
    <el-table-column label="展示" width="80" align="center">
      <template #default="scope">
        <el-switch v-model="scope.row.isShow" @change="updateLinkType(scope.row.id, scope.row.isShow)"></el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="240" align="center">
      <template #default="scope">
        <el-button type="primary" text @click="showUpdateLink(scope.row)">修改</el-button>
        <el-button type="danger" text @click="deleteLink(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>



<style scoped>

</style>