import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', component: () => import('../components/Login.vue')},
    {
      path: '/home',
      component: () => import('../components/Home.vue'),
      redirect: '/welcome',
      children:[
        {path: '/welcome', component: () => import('../components/Welcome.vue')},
        {path: '/users', component: () => import('../components/user/Uesrs.vue')},
        {path: '/rights', component: () => import('../components/power/Rights.vue')},
        {path: '/roles', component: () => import('../components/power/Roles.vue')},
        {path: '/categories', component: () => import('../components/goods/Cate.vue')},
        {path: '/params', component: () => import('../components/goods/Params.vue')},
        {path: '/goods', component: () => import('../components/goods/Goods.vue')},
        {path: '/goods/add', component: () => import('../components/goods/AddGoods.vue')},
        {path: '/orders', component: () => import('../components/order/Order.vue')},
        {path: '/reports', component: () => import('../components/report/Report.vue')}
    ]},
  ]
})
router.beforeEach((to, from, next) => {
  if(to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token');
  if(!tokenStr) return next('/login');
  next();
})
export default router