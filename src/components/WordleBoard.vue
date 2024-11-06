<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { MAX_GUESS_COUNT, VICTORY_MESSAGE } from '@/settings';
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
    <div v-if="!isGameOver" class="osk">
      <div class="osk__row">
        <button tabindex="-1" data-key="q">q</button>
        <button tabindex="-1" data-key="w">w</button>
        <button tabindex="-1" data-key="e">e</button>
        <button tabindex="-1" data-key="r">r</button>
        <button tabindex="-1" data-key="t">t</button>
        <button tabindex="-1" data-key="y">y</button>
        <button tabindex="-1" data-key="u">u</button>
        <button tabindex="-1" data-key="i">i</button>
        <button tabindex="-1" data-key="o">o</button>
        <button tabindex="-1" data-key="p">p</button>
      </div>
      <div class="osk__row">
        <button tabindex="-1" data-key="a">a</button>
        <button tabindex="-1" data-key="s">s</button>
        <button tabindex="-1" data-key="d">d</button>
        <button tabindex="-1" data-key="f">f</button>
        <button tabindex="-1" data-key="g">g</button>
        <button tabindex="-1" data-key="h">h</button>
        <button tabindex="-1" data-key="j">j</button>
        <button tabindex="-1" data-key="k">k</button>
        <button tabindex="-1" data-key="l">l</button>
      </div>
      <div class="osk__row">
        <button tabindex="-1" data-key="backspace">
          <img
            src="https://cdn.onlinewebfonts.com/svg/img_389509.svg"
            alt="backspace"
          />
        </button>
        <button tabindex="-1" data-key="z">z</button>
        <button tabindex="-1" data-key="x">x</button>
        <button tabindex="-1" data-key="c">c</button>
        <button tabindex="-1" data-key="v">v</button>
        <button tabindex="-1" data-key="b">b</button>
        <button tabindex="-1" data-key="n">n</button>
        <button tabindex="-1" data-key="m">m</button>
        <button tabindex="-1" data-key="enter">Enter</button>
      </div>
    </div>
  </main>
</template>
