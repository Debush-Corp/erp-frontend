import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ErpView from '../views/ErpView.vue'
import HomeView from '@/views/HomeView.vue'
import AccessView from '@/views/AccessView.vue'
import UsersView from '@/views/UsersView.vue'
import InventoryView from '@/views/InventoryView.vue'
import ProductsView from '@/views/ProductsView.vue'
import MaterialsView from '@/views/MaterialsView.vue'
import FabricationView from '@/views/FabricationView.vue'
import MarketView from '@/views/MarketView.vue'
import SalesView from '@/views/SalesView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: '/',
    name: 'erp',
    component: ErpView,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/home',
        name: 'home',
        component: HomeView,
        meta: { requiresAuth: true }
      },
      {
        path: "/access",
        name: "access",
        component: AccessView,
        children: [
          {
            path: '/users',
            name: 'users',
            component: UsersView,
            meta: { requiresAuth: true }
          },
        ]
      },
      {
        path: "/inventory",
        name: "inventory",
        component: InventoryView,
        children: [
          {
            path: "/products",
            name: "products",
            component: ProductsView
          },
          {
            path: "/materials",
            name: "materials",
            component: MaterialsView
          },
        ]
      },
      {
        path: "/fabrication",
        name: "fabrication",
        component: FabricationView
      },
      {
        path: "/market",
        name: "market",
        component: MarketView
      },
      {
        path: "/sales",
        name: "sales",
        component: SalesView
      }]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' }) // Redirige al login si no está logueado
  } else if (to.name === 'login' && isAuthenticated) {
    next({ name: 'home' }) // Si ya está logueado y quiere ir a login, lo mandas a home
  } else {
    next() // Puede pasar
  }
})

export default router