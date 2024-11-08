<script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import { MAX_GUESS_COUNT, VICTORY_MESSAGE } from '@/settings';
  import englishWords from '@/englishWordsWith5Letters.json';
  import GuessInput from './GuessInput.vue';
  import GuessView from './GuessView.vue';
  import OnScreenKeyboard from './OnScreenKeyboard.vue';
  import { useGuessModel } from '@/composables/useGuessModel';
  import PlayButton from './PlayButton.vue';

  const props = defineProps({
    wordOfTheDay: {
      type: String,
      required: true,
      validator: (wordGiven: string) => englishWords.includes(wordGiven),
    },
  });

  const { guessSubmitted, resetGuessModel } = useGuessModel();

  const isGameOver = computed(() => {
    return (
      guessSubmitted.value.length === MAX_GUESS_COUNT ||
      guessSubmitted.value.includes(props.wordOfTheDay)
    );
  });

  const countOfEmptyGuesses = computed(() => {
    const guessRemaining = MAX_GUESS_COUNT - guessSubmitted.value.length;

    return isGameOver.value ? guessRemaining : guessRemaining - 1;
  });

  onMounted(() => {
    resetGuessModel();
  });
</script>

<template>
  <main>
    <ul class="board-list">
      <li
        v-for="(guess, index) in guessSubmitted"
        :key="`${index}-${guess}`"
        class="board-list__row"
      >
        <GuessView :guess="guess" :answer="wordOfTheDay" />
      </li>
      <li class="board-list__row">
        <GuessInput
          :disabled="isGameOver"
          v-on:guess-submitted="(guess) => guessSubmitted.push(guess)"
        />
      </li>
      <li
        v-for="i in countOfEmptyGuesses"
        :key="`remaining-guess-${i}`"
        class="board-list__row"
      >
        <GuessView guess="" />
      </li>
    </ul>
    <p
      v-if="isGameOver"
      class="result"
      v-text="
        guessSubmitted.includes(wordOfTheDay) ? VICTORY_MESSAGE : wordOfTheDay
      "
    />
    <OnScreenKeyboard v-if="!isGameOver" />
    <PlayButton v-if="isGameOver" />
  </main>
</template>
