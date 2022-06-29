<template>
  <ul class="infra-host-list">
    <li v-if="isLoading">Chargement des hosts en cours...</li>
    <template v-else>
      <InfraHostItem
        v-for="id in ids"
        :key="id"
        :host-id="id"
      />
    </template>
  </ul>
</template>

<script lang="ts" setup>
  import InfraHostItem from '@/components/infra/InfraHostItem.vue';
  import { useHostStore } from '@/stores/host.store';
  import { storeToRefs } from 'pinia';

  const hostStore = useHostStore();
  const { ids, isLoading } = storeToRefs(hostStore);

  hostStore.loadAll();
</script>
