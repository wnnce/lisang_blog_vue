import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('dataStore', () => {
  const setting = reactive({})
  const articleNum = ref(0)
  const adminUser = ref({})
  const user = ref({})
  return { setting, adminUser, user, articleNum}
}, {
  persist: {
    key: 'lisangBlog',
    storage: sessionStorage
  }
})
