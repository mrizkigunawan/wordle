<script setup lang="ts">
  import { computed, ref, triggerRef, withDefaults } from 'vue';
  import { WORD_SIZE } from '@/settings';
  import englishWords from '@/englishWordsWith5Letters.json';
  import GuessView from './GuessView.vue';

  withDefaults(defineProps<{ disabled?: boolean }>(), { disabled: false });

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
    guessInProgress.value = null;
  }
</script>

<template>
  <GuessView v-if="!disabled" :guess="formattedGuessInProgress" />

  <input
    type="text"
    v-model="formattedGuessInProgress"
    autofocus
    :disabled="disabled"
    aria-label="Make your guess for the word of the day!"
    :maxlength="WORD_SIZE"
    @blur="({ target }) => (target as HTMLInputElement).focus()"
    @keydown.enter="onSubmit"
  />
</template>

<style scoped>
  input {
    position: absolute;
    opacity: 0;
  }
</style>
