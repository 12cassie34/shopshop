import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/pages/Login';
import Dashboard from '@/components/pages/Dashboard';
import Products from '@/components/pages/Products';
import Coupons from '@/components/pages/Coupons';
import CustomerOrder from '@/components/pages/CustomerOrder';
import Orders from '@/components/pages/Orders'
import Orderpay from '@/components/pages/Orderpay';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true }
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true}
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true}
        }
      ],
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '/customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder,
        },
        {
          path: 'customer_order/:orderId',
          name: 'Orderpay',
          component: Orderpay
        }
      ],
    },
  ]
})
