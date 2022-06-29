<template>
  <li class="infra-loading-item">
    <InfraItemLabel
      :icon="icon"
      route="#"
    >
      Chargement en cours...
    </InfraItemLabel>
  </li>
</template>

<script lang="ts" setup>
  import InfraItemLabel from '@/components/infra/InfraItemLabel.vue';
  import type { IconDefinition } from '@fortawesome/fontawesome-common-types';

  defineProps<{
    icon: IconDefinition
  }>();
</script>
