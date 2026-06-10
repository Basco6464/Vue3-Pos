<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  getProfile,
  getAccessToken,
  setAccessToken,
  setProfile,
} from "../store/profile.store";
import { useRouter } from "vue-router";

const router = useRouter();

const profile = ref<any>(null);
const token = ref<string | null>(null);

onMounted(() => {
  profile.value = getProfile();
  token.value = getAccessToken();
  if (!token.value || !profile.value) {
    router.replace("/login");
  }
});

const handleLogout = () => {
  setAccessToken("");
  setProfile(null);
  router.replace("/login");
};
</script>

<template>
  <header class="topbar d-flex align-items-center justify-content-between px-3">
    <!-- LEFT: Search -->
    <div class="d-flex align-items-center gap-2 flex-grow-1">
      <i class="bi bi-search text-secondary"></i>

      <input
        type="text"
        class="form-control form-control-sm search-input"
        placeholder="Search anything..."
      />
    </div>

    <!-- RIGHT: Actions -->
    <div class="d-flex align-items-center gap-3">
      <!-- Notifications -->
      <div class="icon-btn position-relative">
        <i class="bi bi-bell fs-5"></i>
        <span class="badge-dot"></span>
      </div>

      <!-- Messages -->
      <div class="icon-btn position-relative">
        <i class="bi bi-chat-dots fs-5"></i>
        <span class="badge-dot"></span>
      </div>

      <!-- Divider -->
      <div class="vr"></div>

      <!-- User Dropdown -->
      <div class="dropdown">
        <div
          class="d-flex align-items-center gap-2 user-box"
          data-bs-toggle="dropdown"
        >
          <div class="avatar">JD</div>

          <div class="d-flex flex-column">
            <span class="user-name">{{ profile?.name }}</span>
            <span class="user-role">{{ profile?.role_name }}</span>
          </div>

          <i class="bi bi-chevron-down small"></i>
        </div>

        <ul class="dropdown-menu dropdown-menu-end mt-2">
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <a class="dropdown-item text-danger" @click="handleLogout"
              >Logout</a
            >
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.topbar {
  height: 60px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 10;
}

/* search */
.search-input {
  max-width: 300px;
  border-radius: 8px;
}

/* icon buttons */
.icon-btn {
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  transition: 0.2s;
  color: #6b7280;
}

.icon-btn:hover {
  background: #f3f4f6;
  color: #111827;
}

/* red dot */
.badge-dot {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  background: red;
  border-radius: 50%;
}

/* user */
.user-box {
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 10px;
  transition: 0.2s;
}

.user-box:hover {
  background: #f3f4f6;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, #0d6efd, #6ea8fe);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 12px;
}

.user-name {
  font-size: 13px;
  font-weight: 600;
  color: #111827;
}

.user-role {
  font-size: 11px;
  color: #6b7280;
}
</style>
