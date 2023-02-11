<!--评论组件-->
<script setup>
import 'artalk/dist/Artalk.css'
import {onMounted} from 'vue'
import Artalk from 'artalk'
const props = defineProps(['title', 'placeholder'])
onMounted(() => {
  const artalk = new Artalk({
    el: '#artalk',
    pageTitle: props.title,
    server: 'https://blog.zeroxn.com/comments/',
    site: '离桑的博客',
    placeholder: props.placeholder,
    // 图片上传 关闭图片评论
    imgUpload: false,
    // imgUploader: async (file) => {
    //   const imgUrl = await _fileUpload(file);
    //   if(imgUrl){
    //     return imgUrl;
    //   }else {
    //     elErrorNot('', '图片上传失败！');
    //   }
    // }
  })
})
</script>

<template>
  <div id="artalk"></div>
</template>

<style scoped lang="scss">
</style>