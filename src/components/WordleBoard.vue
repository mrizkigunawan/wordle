<script setup lang="ts">
  import { ref } from 'vue';
  import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/settings';
  import englishWords from '@/englishWordsWith5Letters.json';
  import GuessInput from './GuessInput.vue';

  defineProps({
    wordOfTheDay: {
      type: String,
      validator: (wordGiven: string) => englishWords.includes(wordGiven),
    },
  });

  const guessSubmitted = ref('');
</script>

<template>
  <GuessInput v-on:guess-submitted="(guess) => (guessSubmitted = guess)" />
  <p
    v-if="guessSubmitted.length > 0"
    v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
  ></p>
</template>
