<template>
  Chargement en cours...
</template>

<script lang="ts" setup>
  import { usePoolStore } from '@/stores/pool.store';
  import { watchEffect } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const poolStore = usePoolStore();

  watchEffect(() => {
    if (poolStore.poolId) {
      router.push({
        name: 'pool.dashboard',
        params: { id: poolStore.poolId },
      });
    }
  });
</script>
