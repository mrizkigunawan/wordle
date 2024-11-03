<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/settings';
  import englishWords from '@/englishWordsWith5Letters.json';

  defineProps({
    wordOfTheDay: {
      type: String,
      validator: (wordGiven: string) => englishWords.includes(wordGiven),
    },
  });

  const guessInProgress = ref('');
  const guessSubmitted = ref('');

  const formattedGuessInProgress = computed({
    get() {
      return guessInProgress.value;
    },
    set(rawValue) {
      guessInProgress.value = rawValue.slice(0, 5);
    },
  });
</script>

<template>
  <input
    type="text"
    v-model="formattedGuessInProgress"
    @keydown.enter="guessSubmitted = guessInProgress"
  />
  <p
    v-if="guessSubmitted.length > 0"
    v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
  ></p>
</template>
