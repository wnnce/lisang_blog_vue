import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import prismjs from 'vite-plugin-prismjs';
// 按需加载插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {AntDesignVueResolver, ElementPlusResolver} from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    prismjs({
      languages: ['json', 'java', 'python', 'sql', 'yaml', 'bash', 'go', 'html', 'xml', 'javascript', 'typescript', 'dockerfile'],
    }),
      //配置 element-plus、Antd ui库的自动加载
    AutoImport({
      resolvers: [ElementPlusResolver(), AntDesignVueResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver(), AntDesignVueResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/scss/global.scss";'
      }
    }
  },
})
