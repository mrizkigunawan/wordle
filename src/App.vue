<script setup lang="ts">
  import { computed } from 'vue';
  import WordleBoard from './components/WordleBoard.vue';
  import englishWords from './englishWordsWith5Letters.json';
  import './assets/styles.scss';

  const chosenWord = computed(() => {
    const totalWords = englishWords.length;
    const randomNumber = Math.random() * totalWords;
    const position = Math.floor(randomNumber);
    return englishWords[position];
  });
</script>

<template>
  <WordleBoard :word-of-the-day="chosenWord" />
</template>
