<script setup lang="ts">
  import { ref } from 'vue';
  import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/settings';

  defineProps<{
    wordOfTheDay: string;
  }>();

  const guessInProgress = ref('');
  const guessSubmitted = ref('');
</script>

<template>
  <input
    type="text"
    v-model="guessInProgress"
    @keydown.enter="guessSubmitted = guessInProgress"
  />
  <p
    v-if="guessSubmitted.length > 0"
    v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
  ></p>
</template>
