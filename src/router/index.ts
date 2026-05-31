// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../view/Home.vue";
import Users from "../view/Users.vue";
import Category from "../view/category/Category.vue";
import Product from "../view/Products.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/categories",
    name: "Category",
    component: Category,
  },
  {
    path: "/products",
    name: "Product",
    component: Product,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
