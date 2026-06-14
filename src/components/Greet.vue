<script setup lang="ts">
interface Props {
  name: string;
  role: string;
  salary: number;
  position: number;
}
defineProps<Props>();
</script>

<template>
  <div
    style="
      background-color: aquamarine;
      display: flex;
      justify-content: center;
      color: black;
    "
  >
    <h1>Name:{{ name }}</h1>
    <h1>Role:{{ role }}</h1>
    <h1>Salary:{{ salary }}</h1>
    <h1>Position:{{ position }}</h1>
    <button @click="$emit('deleteItem')">Delete</button>
  </div>
</template>
