<!--联系方式组件-->
<script setup>
defineProps(['href', 'src'])
</script>

<template>
  <div class="link-logo-div">
    <a :href="href" target="_blank">
      <img :src="src" alt="link"/>
    </a>
  </div>
</template>

<style scoped lang="scss">
.link-logo-div{
  padding: 4px 12px;
  display: inline-block;
  a{
    img{
      height: 20px;
      width: 20px;
    }
  }
}
</style>