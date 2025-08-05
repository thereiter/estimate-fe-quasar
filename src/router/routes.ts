import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    props: true,
    name: "estimate",
    children: [
      {
        path: "",
        name: "app-entry",
        component: () => import("pages/Index.vue"),
      },
      {
        path: "checkout/",
        name: "checkout",
        component: () => import("pages/Checkout.vue"),
        children: [
          {
            path: "flat-sale/",
            name: "flat-sale",
            component: () => import("pages/CheckoutFlatSale.vue"),
          },
          {
            path: "house-sale/",
            name: "house-sale",
            component: () => import("pages/CheckoutHouseSale.vue"),
          },
          {
            path: "flat-rent/",
            name: "flat-rent",
            component: () => import("pages/CheckoutFlatRent.vue"),
          },
          {
            path: "house-rent/",
            name: "house-rent",
            component: () => import("pages/CheckoutHouseRent.vue"),
          },
        ],
      },
      {
        path: "auth/",
        name: "auth",
        component: () => import("pages/Auth.vue"),
      },
      {
        path: "personal/",
        name: "personal",
        redirect: { name: "profile" },
        component: () => import("pages/Personal.vue"),
        children: [
          {
            path: "profile/",
            name: "profile",
            component: () => import("components/Personal/Profile.vue"),
          },
          {
            path: "orders/",
            name: "orders",
            component: () => import("components/Personal/Orders.vue"),
          },
          {
            path: "order/:orderAccountNumber",
            name: "order",
            props: true,
            component: () => import("components/Personal/Order.vue"),
          },
        ],
      },
      {
        path: "/logout/",
        name: "logout",
        redirect: to => {
          return { path: '/search' }
        },
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
