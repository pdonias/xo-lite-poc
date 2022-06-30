<template>
  <li v-if="host" class="infra-host-item">
    <InfraItemLabel
      :current="isCurrentHost"
      :icon="faServer"
      :route="{ name: 'host.dashboard', params: { id: hostId } }"
    >
      {{ host.name_label }}
      <template #actions>
        <InfraAction :icon="isExpanded ? faAngleDown : faAngleUp" @click="toggle" />
      </template>
    </InfraItemLabel>

    <InfraVmList v-show="isExpanded" :host-id="hostId" />
  </li>
</template>

<script lang="ts" setup>
  import InfraAction from '@/components/infra/InfraAction.vue';
  import InfraItemLabel from '@/components/infra/InfraItemLabel.vue';
  import InfraVmList from '@/components/infra/InfraVmList.vue';
  import useToggle from '@/composables/useToggle';
  import { useHostStore } from '@/stores/host.store';
  import { useUiStore } from '@/stores/ui.store';
  import { faAngleDown, faAngleUp, faServer } from '@fortawesome/free-solid-svg-icons';
  import { computed } from 'vue';

  const props = defineProps<{
    hostId: string
  }>();

  const hostStore = useHostStore();
  const host = computed(() => hostStore.getRecord(props.hostId));

  const uiStore = useUiStore();

  const isCurrentHost = computed(() => props.hostId === uiStore.currentHostId);
  const { isActive: isExpanded, toggle } = useToggle();
</script>


<style scoped>
  .infra-host-item:deep(.link) {
    padding-left: 3rem;
  }

  .infra-vm-list:deep(.link) {
    padding-left: 4.5rem;
  }
</style>
