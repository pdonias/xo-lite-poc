<template>
  <li v-if="host" class="infra-host-item">
    <InfraItemLabel
      :icon="faServer"
      :route="{ name: 'host.dashboard', params: { ref: host.$ref } }"
      :current="isExpanded || isCurrentHost"
    >
      {{ host.name_label }}
      <template #actions>
        <InfraAction :icon="isExpanded ? faAngleDown : faAngleUp" @click="toggle" />
      </template>
    </InfraItemLabel>

    <InfraVmList v-show="isExpanded" :host-ref="host.$ref" />
  </li>
</template>

<script lang="ts" setup>
  import InfraAction from '@/components/infra/InfraAction.vue';
  import InfraItemLabel from '@/components/infra/InfraItemLabel.vue';
  import InfraVmList from '@/components/infra/InfraVmList.vue';
  import useToggle from '@/composables/useToggle';
  import { useUiStore } from '@/stores/ui.store';
  import { useXenApiStore } from '@/stores/xen-api.store';
  import { faAngleDown, faAngleUp, faServer } from '@fortawesome/free-solid-svg-icons';
  import { computed } from 'vue';

  const props = defineProps<{
    hostRef: string
  }>();

  const xenApiStore = useXenApiStore();
  const uiStore = useUiStore();

  const host = computed(() => xenApiStore.hostByRef(props.hostRef));
  const isCurrentHost = computed(() => props.hostRef === uiStore.currentHostRef);
  const { isActive: isExpanded, toggle } = useToggle();
</script>


<style lang="scss" scoped>
  :deep(.link) {
    padding-left: 3rem;
  }
  .infra-vm-list:deep(.link) {
    padding-left: 4.5rem;
  }
</style>
