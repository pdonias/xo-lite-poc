<template>
  <textarea
    ref="textArea"
    :value="modelValue"
    class="auto-height-textarea"
    @input="handleInput"
  />
</template>

<script lang="ts" setup>
  import { onMounted, onUpdated, ref } from 'vue';

  defineProps<{
    modelValue: string
  }>();

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void
  }>();

  const handleInput = (event: InputEvent) => {
    emit('update:modelValue', (<HTMLTextAreaElement>event.target).value);
  };

  const textArea = ref<HTMLTextAreaElement>();

  const resize = () => {
    textArea.value!.style.height = 'auto';
    textArea.value!.style.height = `${textArea.value!.scrollHeight}px`;
  };

  onMounted(resize);
  onUpdated(resize);
</script>

<style lang="postcss" scoped>
  .auto-height-textarea {
    min-height: 5rem;
    resize: none;
  }
</style>
