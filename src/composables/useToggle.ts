import { ref } from 'vue';

export default function useToggle(activeByDefault = false) {
  const isActive = ref(activeByDefault);
  const toggle = () => isActive.value = !isActive.value;

  return {
    isActive,
    toggle,
  };
};
