import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "../layouts/Mainlayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

import Login from "../view/auth/Login.vue";
import Home from "../view/Home.vue";
import Users from "../view/user/Users.vue";
import Category from "../view/category/Category.vue";
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
    path: "/Main",
    component: MainLayout,
    children: [
      {
        path: "/",
        name: "Dashboard",
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
        path: "/role",
        name: "Role",
        component: Role,
      },
      {
        path: "/pos",
        name: "POS",
        component: () => import("../view/POS.vue"),
      },
      {
        path: "/permission-role",
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
        component: () => import("../view/customer/Customer.vue"),
      },
      {
        path: "/suppliers",
        name: "Supplier",
        component: () => import("../view/Supplier/Supplier.vue"),
      },
      {
        path: "/expense-type",
        name: "Expense_type",
        component: () => import("../view/expense/ExpensesType.vue"),
      },
      {
        path: "/expenses",
        name: "Expense",
        component: () => import("../view/expense/Expenses.vue"),
      },
      {
        path: "/employees",
        name: "Emlpoyee",
        component: () => import("../view/employees/Employees.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
