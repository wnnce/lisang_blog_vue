import { createApp } from 'vue'
import App from './App.vue'
//pinia状态管理
import pinia from '@/stores/store'
//pinia持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import router from './router'
import axios from "axios";

//markdown编辑器
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
//快捷代码复制
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
//代码块 代码行号
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
//markdown样式和高亮代码块
import Prism from 'prismjs';
import {elMessageErr} from "@/assets/js/util";
import {ElMessage} from "element-plus";

//axios全局配置和拦截器
axios.defaults.baseURL = 'https://blog.zeroxn.com/api/';
//最长等待时间 10s
axios.defaults.timeout = 100000;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(res => {
        if(res.data.code === 1001){
            elMessageErr('登录之后才可以访问！')
            setTimeout(() => {
                window.top.location.href = '/cola/login';
            }, 300)
        //只有在后端返回code为1的情况下才表示操作成功 若不是1则打印错误消息
        }else if(res.data.code !== 1){
            ElMessage.error(res.data.message)
        }else{
            return res.data;
        }
    },
    error => {
        const message = error.message;
        if (message === 'Network Error'){
            elMessageErr('网络链接异常！');
        }else if(message.includes('timeout')){
            elMessageErr('接口链接超时！');
        }else if(message.includes('500')){
            elMessageErr('后端接口500异常！');
        }else if(message.includes('404')){
            elMessageErr('后端接口404异常！');
        }else{
            elMessageErr('未知异常！');
        }
    }
)
//代码高亮
VueMarkdownEditor.use(vuepressTheme, {Prism});
//快捷复制
VueMarkdownEditor.use(createCopyCodePlugin())
//显示代码行号
VueMarkdownEditor.use(createLineNumbertPlugin())
//pinia持久化
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(VueMarkdownEditor)
app.use(pinia)
app.use(router)
app.mount('#app')

