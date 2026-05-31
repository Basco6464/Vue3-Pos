<template>
  <aside
    :class="[
      'sidebar',
      'd-flex',
      'flex-column',
      'flex-shrink-0',
      collapsed ? 'sidebar-collapsed' : 'sidebar-expanded',
    ]"
  >
    <div
      class="sidebar-header d-flex align-items-center justify-content-between px-3 py-3"
    >
      <div class="d-flex align-items-center gap-2 overflow-hidden">
        <i class="bi bi-hexagon-fill text-primary fs-5 flex-shrink-0"></i>
        <span
          v-if="!collapsed"
          class="logo-text text-white fw-semibold text-nowrap"
        >
          Mega
        </span>
      </div>
      <button
        class="toggle-btn"
        type="button"
        @click="collapsed = !collapsed"
        :title="collapsed ? 'Expand' : 'Collapse'"
      >
        <i
          :class="['bi', collapsed ? 'bi-chevron-right' : 'bi-chevron-left']"
        ></i>
      </button>
    </div>

    <nav class="flex-grow-1 py-2 overflow-y-auto overflow-x-hidden">
      <p v-if="!collapsed" class="nav-label text-uppercase px-3 mb-2 mt-2">
        Menu
      </p>

      <div v-for="item in navItems" :key="item.path" class="nav-group">
        <router-link
          :to="item.path"
          class="nav-item"
          active-class="active"
          exact-active-class="exact-active"
          :title="collapsed ? item.name : ''"
        >
          <i :class="['bi', item.icon, 'nav-icon']"></i>
          <span v-if="!collapsed">{{ item.name }}</span>
        </router-link>
      </div>
    </nav>

    <div class="sidebar-footer px-3 py-3">
      <div class="d-flex align-items-center gap-2 overflow-hidden">
        <div
          class="avatar d-flex align-items-center justify-content-center flex-shrink-0"
        >
          JD
        </div>
        <div
          v-if="!collapsed"
          class="d-flex flex-column overflow-hidden flex-grow-1"
        >
          <span class="text-white fw-medium text-nowrap user-name">{{
            profile?.name
          }}</span>
          <span class="user-role text-nowrap">{{ profile?.role_name }}</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getProfile } from "../store/profile.stroe";
const profile = ref<any>(null);

profile.value = getProfile();
interface NavItem {
  name: string;
  path: string;
  icon: string;
}

const collapsed = ref(false);

const navItems: NavItem[] = [
  { name: "Home", path: "/", icon: "bi-house-door" },
  { name: "Users", path: "/users", icon: "bi-people" },
  { name: "Categories", path: "/categories", icon: "bi-grid" },
  { name: "Products", path: "/products", icon: "bi-box-seam" },
];
</script>

<style scoped>
.sidebar {
  min-height: 100vh;
  background: #151719;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  transition: width 0.25s ease;
}

.sidebar-expanded {
  width: 240px;
}

.sidebar-collapsed {
  width: 64px;
}

.sidebar-header,
.sidebar-footer {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.sidebar-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 0;
}

.logo-text {
  font-size: 16px;
}

.nav-label {
  color: #6b7280;
  font-size: 10px;
  letter-spacing: 0.08em;
}

.nav-group {
  margin-bottom: 2px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: calc(100% - 16px);
  min-height: 42px;
  margin: 0 8px;
  padding: 9px 12px;
  color: #aeb4bf;
  border: 0;
  border-radius: 8px;
  background: transparent;
  text-align: left;
  text-decoration: none;
  transition:
    background 0.15s,
    color 0.15s;
}

.nav-item:hover,
.nav-item.active,
.nav-item.exact-active {
  background: #25272b;
  color: #fff;
}

.nav-icon {
  width: 18px;
  font-size: 16px;
  text-align: center;
}

.avatar {
  width: 32px;
  height: 32px;
  color: #fff;
  background: linear-gradient(135deg, #0d6efd, #6ea8fe);
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
}

.toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: #9ca3af;
  border: 0;
  border-radius: 6px;
  background: transparent;
}

.toggle-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}

.user-name {
  font-size: 13px;
}

.user-role {
  color: #9ca3af;
  font-size: 11px;
}

nav::-webkit-scrollbar {
  display: none;
}

nav {
  scrollbar-width: none;
}
</style>
