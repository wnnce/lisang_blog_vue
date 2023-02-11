<script setup>
import "@/assets/css/base.css"
import {onMounted, ref} from "vue";
import {_getSiteAbout} from "@/assets/js/api";

const about = ref('')
async function getSiteAbout(){
  about.value = await _getSiteAbout();
}
onMounted(() => {
  getSiteAbout();
})
</script>

<template>
  <a-card title="关于我" hoverable class="card-base" v-loading="!about">
    <v-md-editor :model-value="about" mode="preview" />
  </a-card>
</template>

<style scoped lang="scss">

</style>