<script setup>

</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="['Index']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style>

</style>
