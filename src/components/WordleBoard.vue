<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { DEFEAT_MESSAGE, MAX_GUESS_COUNT, VICTORY_MESSAGE } from '@/settings';
  import englishWords from '@/englishWordsWith5Letters.json';
  import GuessInput from './GuessInput.vue';
  import GuessView from './GuessView.vue';

  const props = defineProps({
    wordOfTheDay: {
      type: String,
      required: true,
      validator: (wordGiven: string) => englishWords.includes(wordGiven),
    },
  });

  const guessSubmitted = ref<string[]>([]);

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
</script>

<template>
  <main>
    <ul>
      <li v-for="(guess, index) in guessSubmitted" :key="`${index}-${guess}`">
        <GuessView :guess="guess" should-flip />
      </li>
      <li>
        <GuessInput
          :disabled="isGameOver"
          v-on:guess-submitted="(guess) => guessSubmitted.push(guess)"
        />
      </li>
      <li v-for="i in countOfEmptyGuesses" :key="`remaining-guess-${i}`">
        <GuessView guess="" />
      </li>
    </ul>
    <p
      v-if="isGameOver"
      class="end-of-game-message"
      v-text="
        guessSubmitted.includes(wordOfTheDay) ? VICTORY_MESSAGE : DEFEAT_MESSAGE
      "
    />
  </main>
</template>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3rem;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-bottom: 0.25rem;
  }

  .end-of-game-message {
    font-size: 3rem;
    animation: end-of-game-message-animation 700ms forwards;
    white-space: nowrap;
    text-align: center;
  }

  @keyframes end-of-game-message-animation {
    0% {
      opacity: 0;
      transform: rotateZ(0);
    }
    100% {
      opacity: 1;
      transform: translateY(2rem);
    }
  }
</style>
