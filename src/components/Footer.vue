<!--底栏-->
<script setup>
import {computed, onMounted} from "vue";
import {VerifiedOutlined} from "@ant-design/icons-vue";
import {useDataStore} from "@/stores/dataStore";
import {isObjectNull} from "@/assets/js/util";
import {_getUserInfo, _getSiteSetting} from "@/assets/js/api";
const store = useDataStore();
const nowYear = computed(() => {
  return new Date().getFullYear();
})
async function getUserInfo(){
  if (isObjectNull(store.user)){
    store.user = await _getUserInfo();
  }
}
async function getSiteSetting(){
  if (isObjectNull(store.setting)){
    store.setting = await _getSiteSetting();
  }
}
const year = computed(() => {
  let index = store.setting.date.indexOf("-")
  return store.setting.date.substring(0, index);
})
onMounted(() => {
  getSiteSetting();
  getUserInfo();
})
</script>

<template>
  <div class="footer">
    <div class="footer-item">
      <a-typography-text style="font-size: 14px" v-if="store.setting.date">
        ©{{year}} - {{nowYear}} By {{store.user.author}}
      </a-typography-text>
    </div>
    <div class="footer-item">
      <a-typography-text type="secondary" style="font-size: 13px" v-html="store.setting.explanation">
      </a-typography-text>
    </div>
    <div class="footer-item">
      <div class="footer-link">
        <span>
          <img src="https://img.shields.io/static/v1?style=appveyor&logo=vue.js&label=Vue&message=3.2.45&color=green" />
        </span>
        <span>
          <img src="https://img.shields.io/static/v1?style=appveyor&logo=Ant Design&label= Ant Design Vue&message=3.2.14&color=blue" />
        </span>
        <span>
          <img src="https://img.shields.io/static/v1?style=appveyor&logo=Axios&label=Axios&message=1.2.2&color=purple" />
        </span>
        <span>
          <img src="https://img.shields.io/static/v1?style=appveyor&logo=Spring Boot&label=SpringBoot&message=2.7.7&color=green" />
        </span>
        <span>
          <img src="https://img.shields.io/static/v1?style=appveyor&logo=PostgreSQL&label=PostgreSQL&message=14.6&color=blue" />
        </span>
        <span>
          <img src="https://img.shields.io/static/v1?style=appveyor&logo=Redis&label=Redis&message=7.0.8&color=red" />
        </span>
      </div>
    </div>
    <div class="footer-item">
      <a-typography-link href="https://beian.miit.gov.cn" type="secondary" style="font-size: 13px"
                         v-if="store.setting.record" undefined>
        <verified-outlined style="color: #e41749"/>
        {{store.setting.record}}
      </a-typography-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer{
  .footer-item{
    padding: 2px 0;
    .footer-link{
      display: flex;
      flex-flow: wrap;
      span{
        margin: 4px 16px 4px 0;
      }
    }
  }
}
</style>