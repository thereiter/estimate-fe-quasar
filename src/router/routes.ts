import type { RouteRecordRaw } from 'vue-router';
declare module 'vue-router' {
  interface RouteMeta {
    sectionTitle?: string;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    props: true,
    name: 'index',
    children: [
      {
        path: '',
        name: 'app-entry',
        component: () => import('pages/Index.vue'),
      },
      {
        path: 'manual/',
        name: 'manual',
        meta: {
          sectionTitle: 'Інструкція користувача',
        },
        component: () => import('pages/Manual.vue'),
      },
      {
        path: 'advantages/',
        name: 'advantages',
        meta: {
          sectionTitle: 'Переваги оцінки нерухомості онлайн',
        },
        component: () => import('pages/Advantages.vue'),
      },
      {
        path: 'price/',
        name: 'price',
        meta: {
          sectionTitle: 'Вартість оцінки',
        },
        component: () => import('pages/Price.vue'),
      },
      {
        path: 'faq/',
        name: 'faq',
        meta: {
          sectionTitle: 'Часті питання',
        },
        component: () => import('pages/Faq.vue'),
      },
      {
        path: 'terms-and-conditions/',
        name: 'terms-and-conditions',
        meta: {
          sectionTitle: 'Публічна оферта — умови користування сервісом',
        },
        component: () => import('pages/TermsAndConditions.vue'),
      },
      {
        path: 'privacy-policy/',
        name: 'privacy-policy',
        meta: {
          sectionTitle: 'Політика конфіденційності',
        },
        component: () => import('pages/PrivacyPolicy.vue'),
      },
      {
        path: 'estimate/',
        name: 'estimate',
        component: () => import('pages/Checkout.vue'),
        children: [
          {
            path: 'flat-sale/',
            name: 'flat-sale',
            component: () => import('pages/CheckoutFlatSale.vue'),
          },
          {
            path: 'house-sale/',
            name: 'house-sale',
            component: () => import('pages/CheckoutHouseSale.vue'),
          },
          {
            path: 'flat-rent/',
            name: 'flat-rent',
            component: () => import('pages/CheckoutFlatRent.vue'),
          },
          {
            path: 'house-rent/',
            name: 'house-rent',
            component: () => import('pages/CheckoutHouseRent.vue'),
          },
        ],
      },
      {
        path: 'auth/',
        name: 'auth',
        component: () => import('pages/Auth.vue'),
      },
      {
        path: 'personal/',
        name: 'personal',
        redirect: { name: 'profile' },
        component: () => import('pages/Personal.vue'),
        children: [
          {
            path: 'profile/',
            name: 'profile',
            component: () => import('components/Personal/Profile.vue'),
          },
          {
            path: 'orders/',
            name: 'orders',
            component: () => import('components/Personal/Orders.vue'),
          },
          {
            path: 'order/:orderAccountNumber',
            name: 'order',
            props: true,
            component: () => import('components/Personal/Order.vue'),
          },
        ],
      },
      {
        path: '/logout/',
        name: 'logout',
        redirect: (to) => {
          return { path: '/search' };
        },
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
