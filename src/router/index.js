import Vue from 'vue'
import VueRouter from 'vue-router'


const login = () => import("../components/login")
const home = () => import("../components/home")
const Welcome = () => import("../components/user/Welcome")
const Users = () => import("../components/user/Users")
const Rights = () => import("../components/rights/Rights")
const Roles = () => import("../components/rights/Roles")
const report = () => import("../components/report/report")
const orders = () => import("../components/order/Order")
const goods = () => import("../components/goods/List")
const params = () => import("../components/goods/Params")
const categories = () => import("../components/goods/Cate")
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
    children: [
      { path: "/welcome", component: Welcome },
      { path: '/users', component: Users },
      { path: "/rights", component: Rights },
      { path: "/Roles", component: Roles },
      { path: "/reports", component: report },
      { path: "/orders", component: orders },
      {
        path: "/goods",
        component: goods
      },
      {
        path: "/params",
        component: params
      },
      {
        path: "/categories",
        component: categories
      },
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
