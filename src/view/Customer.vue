<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useConfigStore } from "../store/config.store";
const configStore = useConfigStore();
</script>

<template>
  <h1>{{ configStore.roles }}</h1>
</template>
