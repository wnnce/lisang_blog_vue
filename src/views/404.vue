<script setup>
</script>

<template>
  <div class="main">
    <img src="/imgs/404.png" alt="404">
    <div class="message">
      <a-typography-title>网页走丢了</a-typography-title>
      <a-typography-title type="secondary" :level="4">您可能输错了网址或网页已被删除</a-typography-title><br>
      <a-button href="https://blog.zeroxn.com" type="primary">返回首页</a-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .main{
    text-align: center;
    width: 600px;
    margin: 80px auto;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .message{
      padding: 24px;
    }
  }
  @media (max-width: 660px) {
    .main{
      width: 80%;
    }
  }
</style>