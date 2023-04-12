<script setup>
import {elSuccessNot, elMessageNot, elMessageBox, isObjectNull, isArrayNull} from "@/assets/js/util";
import {onMounted, ref} from "vue";
import {PlusOutlined, EditOutlined} from "@ant-design/icons-vue";
import LogoUpload from "@/components/LogoUpload.vue";
import {
  _deleteUserLink, _getUserAll, _getUserLinks, _updateUserLinkStatus, _updateUser, _addUserLink,
  _updateUserLink
} from "@/assets/js/api";
import {useDataStore} from "@/stores/dataStore";
const store = useDataStore();
const isUserEdit = ref(false);
const isLinkDialog = ref(false);
const baseRules = ref({required: true, message: '该项不能为空！'})
let userLinks = ref([])
const editUser = ref({})
const linkDialogTitle = ref('')
const linkInfo = ref({})
function openEditUserDialog(){
  editUser.value = JSON.parse(JSON.stringify(store.adminUser))
  isUserEdit.value = true;
}
function deleteLink(id){
  elMessageBox("警告", "确定删除当前联系方式吗？").then(async () => {
    if (await _deleteUserLink(id)){
      elSuccessNot('', '删除成功');
      await getUserLinks();
    }
  }).catch(() => {
    elMessageNot('', '操作取消')
  })
}
async function getUserLinks(){
  userLinks.value = await _getUserLinks()
}
async function updateUserInfo(){
  if(await _updateUser(editUser.value)) {
    elSuccessNot('', '更新成功！');
    isUserEdit.value = false;
    store.adminUser = await _getUserAll();
  }
}
function addLink(){
  linkDialogTitle.value = '新增联系方式';
  linkInfo.value = {};
  isLinkDialog.value = true;
}
async function updateLink(link){
  linkInfo.value = JSON.parse(JSON.stringify(link))
  linkDialogTitle.value = '修改联系方式';
  isLinkDialog.value = true;
}
function updateLinkStatus(link){
  const newStatus = link.status === 1 ?  0 : 1;
  const message = link.status === 1 ? '确定禁用该联系方式？' : '确定启用该联系方式?';
  elMessageBox('提示', message).then(async () => {
    await _updateUserLinkStatus(link.id, newStatus)
    elSuccessNot('', link.status === 1 ? '禁用成功' : '启用成功')
    link.status = newStatus;
  }).catch(() => {
    elMessageNot('', '操作取消')
  })
}
async function submitLink(){
  let data = {name: linkInfo.value.name, url: linkInfo.value.url, logoUrl: linkInfo.value.logoUrl};
  if (linkInfo.value.id){
    data.id = linkInfo.value.id;
    if (await _updateUserLink(data)){
      elSuccessNot('', '修改成功');
      await getUserLinks();
      isLinkDialog.value = false;
    }
  }else{
    if (await _addUserLink(data)){
      elSuccessNot('', '添加成功！');
      await getUserLinks();
      isLinkDialog.value = false;
    }
  }
}

onMounted(() => {
  getUserLinks();
})
</script>
<template>
  <el-dialog v-model="isUserEdit" title="修改用户信息" width="540"
             style="padding: 12px; text-align: center" destroy-on-close>
    <el-form :model="editUser" label-width="80px" label-position="top">
      <el-form-item label="作 者" size="large" :rules="baseRules" prop="author">
        <el-input v-model="editUser.author"></el-input>
      </el-form-item>
      <el-form-item label="用户名" size="large" :rules="baseRules" prop="username">
        <el-input v-model="editUser.username"></el-input>
      </el-form-item>
      <el-form-item label="邮 箱" size="large" :rules="baseRules" prop="email">
        <el-input v-model="editUser.email"></el-input>
      </el-form-item>
      <el-form-item label="修改头像" size="large" :rules="baseRules" prop="avatar">
        <el-input type="hidden" v-model="editUser.avatar"></el-input>
        <LogoUpload v-model:image-url="editUser.avatar"/>
      </el-form-item>
      <el-button type="primary" size="large" @click="updateUserInfo">修改</el-button>
      <el-button type="default" size="large" @click="isUserEdit = false">取消</el-button>
    </el-form>
  </el-dialog>
  <el-dialog v-model="isLinkDialog" :title="linkDialogTitle" width="540"
             style="padding: 12px; text-align: center">
    <el-form :model="linkInfo" label-width="80px" label-position="top">
      <el-form-item label="名 称" :rules="baseRules" prop="name">
        <el-input v-model="linkInfo.name" size="large"></el-input>
      </el-form-item>
      <el-form-item label="链 接" :rules="baseRules" prop="url">
        <el-input v-model="linkInfo.url" size="large"></el-input>
      </el-form-item>
      <el-form-item label="Logo" :rules="baseRules" prop="logoUrl">
        <el-input v-model="linkInfo.logoUrl" type="hidden"></el-input>
        <LogoUpload v-model:image-url="linkInfo.logoUrl"></LogoUpload>
      </el-form-item>
      <el-button type="primary" size="large" @click="submitLink">{{linkInfo.id ? '修改' : '添加'}}</el-button>
      <el-button type="default" size="large" @click="isLinkDialog = false">取消</el-button>
    </el-form>
  </el-dialog>
  <el-descriptions border :column="3" size="large" v-loading="isObjectNull(store.adminUser)">
    <el-descriptions-item label="作 者" align="center" label-align="center">
      {{store.adminUser.author}}
    </el-descriptions-item>
    <el-descriptions-item label="头 像" align="center" label-align="center">
      <el-avatar :src="store.adminUser.avatar"/>
    </el-descriptions-item>
    <el-descriptions-item label="登录用户名" align="center" label-align="center">
      {{store.adminUser.username}}
    </el-descriptions-item>
    <el-descriptions-item label="联系方式" align="center" label-align="center">
      {{userLinks.length}}个
    </el-descriptions-item>
    <el-descriptions-item label="邮 箱" align="center" label-align="center">
      {{store.adminUser.email}}
    </el-descriptions-item>
  </el-descriptions>
  <div class="list-tool">
    <el-button size="large" type="warning" @click="openEditUserDialog">
      <el-icon><edit-outlined class="el-icon--left"/></el-icon>
      修改个人信息
    </el-button>
    <el-button size="large" type="primary" @click="addLink">
      <el-icon><plus-outlined class="el-icon--left"/></el-icon>
      添加联系方式
    </el-button>
  </div>
  <el-table :data="userLinks" stripe style="width: 100%" v-loading="isArrayNull(userLinks)">
    <el-table-column prop="name" label="名称"/>
    <el-table-column prop="logoUrl" label="Logo" align="center">
      <template #default="scope">
        <img :src="scope.row.logoUrl" alt="img" style="height: 24px; object-fit: cover">
      </template>
    </el-table-column>
    <el-table-column prop="url" label="链接" align="center"/>
    <el-table-column prop="createTime" label="创建时间" align="center"/>
    <el-table-column prop="updateTime" label="更新时间" align="center"/>
    <el-table-column label="状态" width="80" align="center">
      <template #default="scope">
        {{scope.row.status === 1 ? '启用' : '禁用'}}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="240" align="center">
      <template #default="scope">
        <el-button type="primary" text @click="updateLink(scope.row)">修改</el-button>
        <el-button type="warning" text @click="updateLinkStatus(scope.row)">{{scope.row.status === 1 ? '禁用' : '启用'}}</el-button>
        <el-button type="danger" text @click="deleteLink(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss">
.list-tool{
  padding: 20px 0;
}
</style>