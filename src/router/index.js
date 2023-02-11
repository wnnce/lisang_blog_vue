import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/views/Index.vue"),
      children:[
        {
          path: "/",
          name: "home",
          component: () => import("@/views/Home.vue"),
        },
        {
          path: "category/:id",
          name: "category",
          component: () => import("@/views/Categories.vue")
        },
        {
          path: "tag/:id",
          name: "tag",
          component: () => import("@/views/Tags.vue")
        },
        {
          path: "about",
          name: "about",
          component: () => import("@/views/About.vue")
        },
        {
          path: "links",
          name: "links",
          component: () => import("@/views/Links.vue")
        }
      ]
    },
    {
      path: "/article/:id",
      name: "article",
      component: () => import("@/views/Article.vue"),
    },
    {
      path: "/cola/login",
      name: "login",
      component: () => import("@/views/admin/Login.vue")
    },
    {
      path: "/cola/admin",
      name: "admin",
      component: () => import("@/views/admin/Admin.vue"),
      children: [
        {
          path: "/cola/admin",
          name: "user",
          component: () => import("@/components/admin/User.vue"),
          meta: {
            title: "个人信息"
          }
        },
        {
          path: "category",
          name: "categoryList",
          component: () => import("@/components/admin/CategoriesList.vue"),
          meta: {
            title: "分类管理"
          }
        },
        {
          path: "tags",
          name: "tagsList",
          component: () => import("@/components/admin/TagsList.vue"),
          meta: {
            title: "标签管理"
          }
        },
        {
          path: "article",
          name: "articleList",
          component: () => import("@/components/admin/ArticleList.vue"),
          meta: {
            title: "文章管理"
          }
        },
        {
          path: "comment",
          name: "commentList",
          component: () => import("@/components/admin/CommentList.vue"),
          meta: {
            title: "评论管理"
          }
        },
        {
          path: "artalk/comment",
          name: "artalkComment",
          component: () => import("@/components/admin/ArtalkComment.vue"),
          meta: {
            title: "Artalk评论管理"
          }
        },
        {
          path: "artalk/page",
          name: "artalkPage",
          component: () => import("@/components/admin/ArtalkPage.vue"),
          meta: {
            title: "Artalk评论页管理"
          }
        },
        {
          path: "artalk/user",
          name: "artalkUser",
          component: () => import("@/components/admin/ArtalkUser.vue"),
          meta: {
            title: "Artalk评论用户管理"
          }
        },
        {
          path: "setting",
          name: "siteSetting",
          component: () => import("@/components/admin/SiteSetting.vue"),
          meta: {
            title: "站点配置"
          }
        },
        {
          path: "about",
          name: "siteAbout",
          component: () => import("@/components/admin/SiteAbout.vue"),
          meta: {
            title: "关于我"
          }
        },
        {
          path: "links",
          name: "linksAdmin",
          component: () => import("@/components/admin/LinksAdmin.vue"),
          meta: {
            title: "友链管理"
          }
        }
      ]
    },
    {
      path: '/404',
      name: 'notFount',
      component: () => import("@/views/404.vue")
    },
    {
      path: "/:pathMath(.*)",
      redirect: "/404"
    }
  ]
})
export default router