# blog-Vue
博客系统的前端，使用`ant-design-vue`和`element-plus`ui框架搭建而成。包管理器采用`pnpm`，前台页面有完整的移动端适配。

完整介绍请看 [lisang_blog]()

演示[Demo]()
## 如何使用
1. 克隆本仓库
2. 安装`pnpm`包管理器
    ```shell
    # macOS
    brew install pnpm
    # ArchLinux
    sudo pacman -S pnpm
    # 也可以使用pnpm安装
    npm install pnpm
   ```
3. 替换`main.js`和`Artalk.vue`中的后台地址为你自己的地址
4. 运行
    ```
    pnpm dev
    ```
## 后续计划
- 后台管理页面移动端适配
- 文章页面添加分类目录
- UI优化
- 交互优化
- BUG修复