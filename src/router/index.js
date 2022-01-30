import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/learn'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: "/learn",
    name: "学习情况",
    meta: {
      title: "学习情况"
    },
    component: () => import("../views/Learn.vue")
  },
  {
    path: "/code",
    name: "在线编程",
    meta: {
      title: "在线编程"
    },
    component: () => import("../views/Code.vue")
  },
  {
    path: "/admin",
    name: "管理后台",
    meta: {
      title: "管理后台"
    },
    redirect: '/admin/table',
    component: () => import("../views/Admin.vue"),
    children: [
      {
        path: "/admin/table",
        name: "学生信息管理",
        meta: {
          title: "学生信息管理"
        },
        component: () => import("../views/admin/Table.vue"),
      },
      {
        path: "/admin/curriculum",
        name: "课程内容学习",
        meta: {
          title: "课程内容学习"
        },
        component: () => import("../views/admin/Curriculum.vue"),
      },
      {
        path: "/admin/resource",
        name: "资源使用情况",
        meta: {
          title: "资源使用情况"
        },
        component: () => import("../views/admin/TeachR.vue"),
      },
      {
        path: "/admin/assignment",
        name: "作业情况",
        meta: {
          title: "作业情况"
        },
        component: () => import("../views/admin/Assignment.vue"),
      },
      {
        path: "/admin/project",
        name: "项目情况",
        meta: {
          title: "项目情况"
        },
        component: () => import("../views/admin/CodeAbility.vue"),
      },
      {
        path: "/admin/individual",
        name: "个性化查询",
        meta: {
          title: "个性化查询"
        },
        component: () => import("../views/admin/Individual.vue"),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router