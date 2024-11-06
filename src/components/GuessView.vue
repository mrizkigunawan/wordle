<script setup lang="ts">
  import { WORD_SIZE } from '@/settings';

  const props = defineProps<{ guess: string; answer?: string }>();

  function getFeedback(
    letterPosition: number
  ): null | 'correct' | 'incorrect' | 'almost' {
    if (!props.answer) return null;

    const letterExpected = props.answer[letterPosition];
    const letterGuessed = props.guess[letterPosition];

    if (props.answer.includes(letterGuessed)) {
      return letterExpected === letterGuessed ? 'correct' : 'almost';
    }

    return 'incorrect';
  }
</script>

<template>
  <ul class="row-item">
    <li
      v-for="(letter, index) in guess.padEnd(WORD_SIZE, ' ')"
      :key="`${letter}-${index}`"
      :data-letter="letter"
      :data-letter-feedback="getFeedback(index)"
      class="row-item__column"
      :class="{ 'row-item__column--flip': answer }"
      v-text="letter"
    />
  </ul>
</template>
