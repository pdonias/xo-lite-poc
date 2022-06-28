<template>
  <header class="app-header">
    <RouterLink :to="{ name: 'home' }">
      <img src="../assets/logo.png" alt="XO Lite" style="width: 8rem" />
    </RouterLink>
    <slot />
    <span @click="toggleTheme" style="cursor:pointer;">Switch theme</span>
  </header>
</template>

<script lang="ts" setup>
const toggleTheme = () => {
  document.body.classList.toggle('dark');
}
</script>

<style scoped>
  .app-header {
    display: flex;
    align-items: center;
    min-height: 8rem;
    padding: 0 0.8rem;
    border-bottom: 0.1rem solid var(--color-blue-scale-400);
    background-color: var(--background-color-secondary);
  }
</style>
