<script setup>
import { UserOutlined, KeyOutlined, MailOutlined } from "@ant-design/icons-vue";
import {reactive, ref} from "vue";
import {_sendCode, login} from "@/assets/js/api";
import {elErrorNot, elSuccessNot} from "@/assets/js/util";
import {goAdmin} from "@/assets/js/router";
const ruleFormRef = ref();
const loading = ref(false);
const isCodeButton = ref(true);

const fromData = reactive({
  username: '',
  password: '',
  // code: ''
})

const checkCode = (rule, value, callback) => {
  const reg = new RegExp(/^\d{6}$/)
  if(value === ''){
    callback(new Error('验证码不能为空'))
  }else if(!reg.test(value)){
    callback(new Error('验证码格式错误'))
  }else{
    callback()
  }
}

const rules = reactive({
  code: [{
    validator: checkCode,
    trigger: 'blur'
  }]
})

async function sendCheckCode(){
  isCodeButton.value = false;
  if (await _sendCode()){
    elSuccessNot('', '验证码发送成功');
    setTimeout(() => {
      isCodeButton.value = true;
    }, 30000)
  }else {
    elErrorNot('', '验证码发送失败，请重试')
  }
}
function onSubmit(formEl){
  loading.value = true;
  formEl.validate((valid) => {
    if (valid){
      login({username: fromData.username, password: fromData.password, code: fromData.code}).then(value => {
        if (value.code === 1){
          elSuccessNot('登录成功', '欢迎回来' + fromData.username );
          clearFrom(ruleFormRef.value)
          goAdmin();
        }
      })
      loading.value = false;
    }else{
      loading.value = false;
    }
  })
}
function clearFrom(formEl){
  formEl.resetFields();
}
</script>

<template>
  <div class="login-div">
    <el-card shadow="hover" style="padding: 12px">
      <h1>博客后台管理</h1>
      <el-form ref="ruleFormRef" :model="fromData" status-icon :rules="rules">
        <el-form-item :rules="{required: true, message: '用户名不能为空'}" prop="username">
          <el-input type="text" v-model="fromData.username" clearable placeholder="用户名" size="large"
                    :prefix-icon="UserOutlined"/>
        </el-form-item>
        <el-form-item :rules="{required: true, message: '密码不能为空'}" prop="password">
          <el-input type="password" v-model="fromData.password" clearable placeholder="密码" show-password
                    size="large" :prefix-icon="KeyOutlined"/>
        </el-form-item>
<!--        <el-form-item prop="code">-->
<!--          <el-input type="text" v-model="fromData.code" clearable placeholder="验证码"-->
<!--                    size="large" :prefix-icon="MailOutlined">-->
<!--            <template #append>-->
<!--              <el-button :disabled="!isCodeButton" @click="sendCheckCode">{{isCodeButton ? '发 送' : '已发送'}}</el-button>-->
<!--            </template>-->
<!--          </el-input>-->
<!--        </el-form-item>-->
        <el-button type="primary" :loading="loading" size="large" @click="onSubmit(ruleFormRef)"
                   :loading-icon="!isCodeButton">{{!loading ? '登 录' : '登录中'}}</el-button>
        <el-button type="warning" size="large" @click="clearFrom(ruleFormRef)">重 置</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.login-div{
  width: 400px;
  margin: auto;
  margin-top: 200px;
  text-align: center;
}
</style>