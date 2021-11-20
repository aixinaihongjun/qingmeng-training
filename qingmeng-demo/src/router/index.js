import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/chooseIdentity',
    name: 'ChooseIdentity',
    component: () => import('../views/ChooseIdentity.vue')
  },
  {
    path: '/register/:id',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  // { //workbench/publish-task
  //   path: '/workbench',
  //   name: 'Workbench',
  //   component: () => import('../views/workbench/Index.vue'),
  //   children: [
  //     {
  //       path: "dashboard",
  //       name: "Dashboard",
  //       component: () => import('../views/workbench/employers/Dashboard.vue')
  //     },
  //     // {
  //     //   path: "dashboard",
  //     //   name: "Dashboard",
  //     //   component: () => import('../views/workbench/developers/Dashboard.vue')
  //     // },
  //     {
  //     path: 'publish-task', //仪表盘
  //     name: 'PublishTask',
  //     component: () => import('../views/workbench/employers/PublishTask.vue')
  //   }]
  // },
]

/**
 * developerRoutes
 * 需要动态的根据用户的roles进行加载的routes
 */
 export const developerRoutes = [{
  path: '/workbench',
  name: 'Workbench',
  component: () => import('../views/workbench/Index.vue'),
  redirect: '/workbench/dashboard',
  meta: {
    title: '工作台',
    // icon: 'lock',
  },
  children: [{
    path: 'dashboard', //仪表盘
    name: 'Dashboard',
    component: () => import('../views/workbench/developers/Dashboard.vue'),
    meta: {
      title: '仪表盘',
      icon: "la la-home",
    }
  },
  {
    path: 'my-tasks',
    name: 'MyTasks',
    component: () => import('../views/workbench/developers/MyTasks.vue'),
    meta: {
      title: '我的任务',
      icon: "qingmeng-icon icon-my-projects-line-gray",
    }
  },
  
  
  // 404 page must be placed at the end !!!
  // {path: '*', redirect: '/404', hidden: true}
  {
    path: '*',
    name: 'Error',
    hidden: true,
    component: () => import('../views/Error.vue')
  }
  ]
}]


/**
 * employerRoutes
 * 需要动态的根据用户的roles进行加载的routes
 */
export const employerRoutes = [{
  path: '/workbench',
  name: 'Workbench',
  component: () => import('../views/workbench/Index.vue'),
  redirect: '/workbench/dashboard',
  meta: {
    title: '工作台',
  },
  children: [{
    path: 'dashboard', //仪表盘
    name: 'Dashboard',
    component: () => import('../views/workbench/employers/Dashboard.vue'),
    meta: {
      title: '仪表盘',
      icon: "la la-home"
    }
  },
  {
    path: 'my-tasks', //项目管理
    name: 'MyTasks',
    component: () => import('../views/workbench/employers/MyTasks.vue'),
    meta: {
      title: '我的任务',
      icon: "qingmeng-icon icon-my-projects-line-gray"
    }
  },
  {
    path: 'publish-task',
    name: 'PublishTask',
    component: () => import('../views/workbench/employers/PublishTask.vue'),
    meta: {
      title: "发布任务",
      icon: "qingmeng-icon icon-publish-task-line-gray",
    }
  },
  {
    path: '*',
    name: 'Error',
    hidden: true,
    component: () => import('../views/Error.vue')
  }
    // 404 page must be placed at the end !!!
    // {path: '*', redirect: '/404', hidden: true}
  ]

}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
