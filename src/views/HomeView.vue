<template>
  Chargement en cours...
</template>

<script lang="ts" setup>
  import { useXenApiStore } from '@/stores/xen-api.store';
  import { watch } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const xenApiStore = useXenApiStore();

  watch(() => xenApiStore.pool, (pool) => {
    if (pool) {
      router.push({
        name: 'pool.dashboard',
        params: { id: pool.$ref },
      });
    }
  });
</script>
