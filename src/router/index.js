import Vue from 'vue'
import VueRouter from 'vue-router'


const login = () => import("../components/login")
const home = () => import("../components/home")
const Welcome = () => import("../components/user/Welcome")
const Users = () => import("../components/user/Users")
<<<<<<< HEAD
=======
const Rights = () => import("../components/rights/Rights")
const Roles = () => import("../components/rights/Roles")
>>>>>>> rights
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    component: home,
    redirect: '/welcome',
    children: [{
        path: "/welcome",
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: "/rights",
        component: Rights
      },
      {
        path: "/Roles",
        component: Roles
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  //from 表示从那个页面跳转
  //to 表示将要访问的页面
  //next()表示放行
  if (to.path === "/login")
    return next();
  const token = window.sessionStorage.getItem('token')
  if (!token) {
    return next("/login")
  }
  next()
})
export default router
