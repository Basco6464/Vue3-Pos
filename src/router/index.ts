import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "../layouts/Mainlayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

import Login from "../view/auth/Login.vue";
import Home from "../view/Home.vue";
import Users from "../view/user/Users.vue";
import Category from "../view/category/Category.vue";
import Product from "../view/Products.vue";
import Role from "../view/role/Role.vue";

const routes = [
  {
    path: "/login",
    component: AuthLayout,
    children: [
      {
        path: "",
        component: Login,
      },
    ],
  },

  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "users",
        name: "Users",
        component: Users,
      },
      {
        path: "categories",
        name: "Category",
        component: Category,
      },
      {
        path: "role",
        name: "Role",
        component: Role,
      },
      {
        path: "/pos",
        name: "POS",
        component: () => import("../view/POS.vue"),
      },
      {
        path: "/user-permission",
        name: "UserPermission",
        component: () => import("../view/user/UserPermission.vue"),
      },
      {
        path: "/products",
        name: "Product",
        component: () => import("../view/product/Product.vue"),
      },
      {
        path: "/customers",
        name: "Customer",
        component: () => import("../view/Customer.vue"),
      },
      {
        path: "/suppliers",
        name: "Supplier",
        component: () => import("../view/Supplier/Supplier.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
