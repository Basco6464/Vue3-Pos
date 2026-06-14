<template>
  <button @click.once="handleclick">Click</button>
</template>

<script setup>
const handleclick = () => {
  console.log("handleclick");
};
</script>
