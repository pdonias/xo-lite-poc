<template>
  <RouterView />
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// watchEffect(() => {
//   uiStore.currentHostRef = route.params.ref;
// })

</script>
