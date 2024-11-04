<script setup lang="ts">
  import { computed, ref, triggerRef } from 'vue';
  import { WORD_SIZE } from '@/settings';
  import englishWords from '@/englishWordsWith5Letters.json';

  const emit = defineEmits<{
    'guess-submitted': [guess: string];
  }>();

  const guessInProgress = ref<string | null>(null);

  const formattedGuessInProgress = computed<string>({
    get() {
      return guessInProgress.value ?? '';
    },
    set(rawValue) {
      guessInProgress.value = rawValue
        .slice(0, WORD_SIZE)
        .toUpperCase()
        .replace(/[^A-Z]+/gi, '');
      triggerRef(formattedGuessInProgress);
    },
  });

  function onSubmit() {
    if (!englishWords.includes(formattedGuessInProgress.value)) {
      return;
    }

    emit('guess-submitted', formattedGuessInProgress.value);
  }
</script>

<template>
  <input
    type="text"
    v-model="formattedGuessInProgress"
    autofocus
    @blur="({ target }) => (target as HTMLInputElement).focus()"
    :maxlength="WORD_SIZE"
    @keydown.enter="onSubmit"
  />
</template>
