<script setup>
import {onMounted, ref} from "vue";
import {_getSiteAbout, _updateSiteAbout} from "@/assets/js/api";
import {elSuccessNot} from "@/assets/js/util";

const about = ref('');

async function getSiteAbout(){
  about.value = await _getSiteAbout();
}
async function updateSiteAbout(){
  if (await _updateSiteAbout(about.value)){
    elSuccessNot('', '更新成功')
    await getSiteAbout();
  }
}
onMounted(() => {
  getSiteAbout();
})
</script>

<template>
  <div style="text-align: end">
    <el-button type="primary" style="width: 100px;" size="large" @click="updateSiteAbout">更新</el-button>
  </div>
  <div style="padding: 0 24px 24px 24px">
    <a-typography-title :level="2" style="text-align: center">关于我</a-typography-title>
    <v-md-editor v-model="about" height="640px" :disabled-menus="[]"/>
  </div>
</template>

<style scoped>

</style>