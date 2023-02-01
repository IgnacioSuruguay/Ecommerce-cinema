import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/SignIn',
    name: 'signin',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignInView.vue')
  },
  {
    path: '/Carrito',
    name: 'carrito',
    component: () => import(/* webpackChunkName: "about" */ '../views/CarritoView.vue')
  },
  {
    path: '/Peliculas',
    name: 'peliculas',
    component: () => import(/* webpackChunkName: "about" */ '../views/PeliculasView.vue')
  },
  {
    path: '/Pedidos',
    name: 'pedidos',
    component: () => import(/* webpackChunkName: "about" */ '../views/PedidosView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
