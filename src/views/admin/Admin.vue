<script setup>
import "@/assets/css/base.css"
//element-plus 中文
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'dayjs/locale/zh-cn'
const locale = zhCn;

import {UserOutlined, TagsOutlined, FolderOpenOutlined, FileTextOutlined, SettingOutlined, CommentOutlined,
  ArrowLeftOutlined, KeyOutlined, LogoutOutlined} from "@ant-design/icons-vue";
import {goHome, goLogin} from "@/assets/js/router";
import {useDataStore} from "@/stores/dataStore";
import {onMounted, reactive, ref} from "vue";
import {_getUserAll, _updateUserPass, _userLogOut} from "@/assets/js/api";
import {elSuccessNot, isObjectNull} from "@/assets/js/util";
import {useRoute} from "vue-router";

const ruleFormRef = ref();
const route = useRoute();
const store = useDataStore();
const isEditPass = ref(false)
const passwdFrom = ref({
  oldPasswd: '',
  newPasswd: '',
  rePasswd: ''
})

const checkPasswd = (rule, value, callback) =>{
  if(value === ''){
    callback(new Error('密码不能为空'));
  }else if(value.length < 6){
    callback(new Error('密码必须大于6位'));
  }else {
    callback();
  }
}
const checkRePasswd = (rule, value, callback) => {
  if (value !== passwdFrom.value.newPasswd){
    callback(new Error('确认密码新密码不一致'));
  }else {
    callback();
  }
}

const rules = reactive({
  oldPasswd: [{
    validator: checkPasswd,
    trigger: 'blur'
  }],
  newPasswd: [{
    validator: checkPasswd,
    trigger: 'blur'
  }],
  rePasswd: [{
    validator: checkRePasswd,
    trigger: 'blur'
  }]
})
async function getUserInfoAll(){
  store.adminUser = await _getUserAll();
}
async function userLogOut(){
  if (isObjectNull(store.adminUser)){
    elSuccessNot('', '没有用户信息')
  }else{
    if (await _userLogOut(store.adminUser.id)){
      store.adminUser = {};
      await goLogin();
    }
  }
}
function editPasswd(formEl){
  formEl.validate(async (valid) =>{
    if (valid){
      let data = new FormData;
      data.append('id', store.adminUser.id);
      data.append('nowPasswd', passwdFrom.value.oldPasswd)
      data.append('newPasswd', passwdFrom.value.newPasswd)
      data.append('rePasswd', passwdFrom.value.rePasswd)
      if (await _updateUserPass(data)){
        elSuccessNot('', '更新成功，请重新登录！')
        store.adminUser = {};
        setTimeout( () => {
          goLogin();
        }, 1000)
      }
    }
  })
}
onMounted(() => {
  if (isObjectNull(store.adminUser)){
    getUserInfoAll();
  }
})
</script>

<template>
  <el-dialog v-model="isEditPass" title="修改登录密码" width="400"
             style="padding: 12px; text-align: center" destroy-on-close>
    <el-form :model="passwdFrom" label-width="94px" ref="ruleFormRef" :rules="rules">
      <el-form-item label="原密码：" size="large" prop="oldPasswd" required>
        <el-input v-model="passwdFrom.oldPasswd" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码：" size="large" prop="newPasswd" required>
        <el-input v-model="passwdFrom.newPasswd" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" size="large" prop="rePasswd" required>
        <el-input v-model="passwdFrom.rePasswd" show-password></el-input>
      </el-form-item>
      <el-button type="primary" size="large" @click="editPasswd(ruleFormRef)">修改</el-button>
      <el-button type="default" size="large">取消</el-button>
    </el-form>
  </el-dialog>
  <el-container style="height: 100%">
    <el-aside class="container-aside">
      <el-scrollbar>
        <div class="aside-logo">
          <img src="/imgs/logo.png" alt="logo">
          <a-typography-title :level="4" style="color:#f5f5f5;">博客后台管理</a-typography-title>
        </div>
        <el-menu class="menu" text-color="#ebedec" active-text-color="#50C1E9" background-color="#525252"
                 :default-active="route.path" :unique-opened="false" :collapse-transition="false" router>
          <el-menu-item index="/cola/admin" :key="1" class="menu-item">
            <el-icon><user-outlined/> </el-icon>
            <span>个人信息</span>
          </el-menu-item>
          <el-menu-item index="/cola/admin/category" :key="2" class="menu-item">
            <el-icon><folder-open-outlined/> </el-icon>
            <span>分类管理</span>
          </el-menu-item>
          <el-menu-item index="/cola/admin/tags" :key="3" class="menu-item">
            <el-icon><tags-outlined/> </el-icon>
            <span>标签管理</span>
          </el-menu-item>
          <el-menu-item index="/cola/admin/article" :key="4" class="menu-item">
            <el-icon><file-text-outlined/> </el-icon>
            <span>文章管理</span>
          </el-menu-item>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><comment-outlined /></el-icon>
              <span>评论管理</span>
            </template>
            <el-menu-item index="/cola/admin/artalk/comment" class="menu-item">评论列表</el-menu-item>
            <el-menu-item index="/cola/admin/artalk/page" class="menu-item">评论页面</el-menu-item>
            <el-menu-item index="/cola/admin/artalk/user" class="menu-item">评论用户</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><setting-outlined /></el-icon>
              <span>页面管理</span>
            </template>
            <el-menu-item index="/cola/admin/setting" class="menu-item">站点配置</el-menu-item>
            <el-menu-item index="/cola/admin/about" class="menu-item">关于我</el-menu-item>
            <el-menu-item index="/cola/admin/links" class="menu-item">友链管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container style="margin-left: 200px; background-color: #f1f1f1;height: 100vh; min-width: 1200px">
      <el-header class="container-header">
        <div class="bar" >
          <el-page-header :icon="null" @back="goHome">
            <template #icon>
              <arrow-left-outlined />
            </template>
            <template #title>
              返回博客
            </template>
            <template #content>
              <span>{{route.meta.title}}</span>
            </template>
            <template #extra>
              <el-dropdown trigger="click">
                <el-avatar :src="store.adminUser.avatar" :size="32"/>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :icon="UserOutlined" disabled style="font-size: 14px">
                      {{store.adminUser.username}}
                    </el-dropdown-item>
                    <el-dropdown-item :icon="KeyOutlined" @click="isEditPass = true">修改密码</el-dropdown-item>
                    <el-dropdown-item :icon="LogoutOutlined" @click="userLogOut">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-page-header>
        </div>
      </el-header>
      <el-main>
        <el-scrollbar max-height="900px">
          <div class="container-body">
            <el-config-provider :locale="locale">
              <router-view />
            </el-config-provider>
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.container-aside{
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #525252;
  width: 200px;
  .aside-logo{
    padding: 32px 0;
    text-align: center;
    img{
      width: 60%;
      object-fit: cover;
    }
  }
  .menu{
    border-right: none;
    .menu-item:hover{
      background-color: #393E46;
      color: white;
    }
  }
}
.container-header{
  padding: 0;
  box-shadow: #e4e5e5 2px 2px 2px;
  background-color: white;
  .bar{
    padding: 12px 48px 0 24px;
  }
}
.container-body{
  background-color: white;
  padding: 24px;
}
</style>