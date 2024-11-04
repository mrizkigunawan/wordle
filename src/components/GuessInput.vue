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
  const hasFailedValidation = ref<boolean>(false);

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
      hasFailedValidation.value = true;
      setTimeout(() => (hasFailedValidation.value = false), 500);

      return;
    }

    emit('guess-submitted', formattedGuessInProgress.value);
    guessInProgress.value = null;
  }
</script>

<template>
  <GuessView
    v-if="!disabled"
    :guess="formattedGuessInProgress"
    :class="{ shake: hasFailedValidation }"
  />

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

  .shake {
    animation-name: shake;
    animation-duration: 100ms;
    animation-iteration-count: 2;
  }

  @keyframes shake {
    0% {
      transform: translateX(-2%);
    }
    25% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(2%);
    }
    75% {
      transform: translateX(0);
    }
  }
</style>
