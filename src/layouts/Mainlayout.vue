<template>
  <div class="layout">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Main -->
    <div class="main">
      <Header />

      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from "../components/AppSidebar.vue";
import Header from "../components/HeaderComponent.vue";
import { onMounted } from "vue";
import { useConfigStore } from "../store/config.store.ts";

const configStore = useConfigStore();

onMounted(() => {
  configStore.fetchConfig();
});
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.content {
  flex: 1;
  background: #f8f9fa;
  padding: 24px;
  overflow-y: auto;
}
</style>
