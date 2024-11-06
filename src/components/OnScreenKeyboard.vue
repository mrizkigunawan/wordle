<script setup lang="ts">
  import { useGuessModel } from '@/composables/useGuessModel';
  import { ref } from 'vue';

  const { guessInProgress } = useGuessModel();

  const keys = ref([
    [
      { key: 'q', isTyped: false },
      { key: 'w', isTyped: false },
      { key: 'e', isTyped: false },
      { key: 'r', isTyped: false },
      { key: 't', isTyped: false },
      { key: 'y', isTyped: false },
      { key: 'u', isTyped: false },
      { key: 'i', isTyped: false },
      { key: 'o', isTyped: false },
      { key: 'p', isTyped: false },
    ],
    [
      { key: 'a', isTyped: false },
      { key: 's', isTyped: false },
      { key: 'd', isTyped: false },
      { key: 'f', isTyped: false },
      { key: 'g', isTyped: false },
      { key: 'h', isTyped: false },
      { key: 'j', isTyped: false },
      { key: 'k', isTyped: false },
      { key: 'l', isTyped: false },
    ],
    [
      { key: 'backspace', isTyped: false },
      { key: 'z', isTyped: false },
      { key: 'x', isTyped: false },
      { key: 'c', isTyped: false },
      { key: 'v', isTyped: false },
      { key: 'b', isTyped: false },
      { key: 'n', isTyped: false },
      { key: 'm', isTyped: false },
      { key: 'enter', isTyped: false },
    ],
  ]);

  function typeGuess(key: string) {
    if (guessInProgress.value) {
      guessInProgress.value += key;
    } else {
      guessInProgress.value = key;
    }
  }
</script>

<template>
  <div class="osk">
    <div
      v-for="(row, rowIndex) in keys"
      :key="`row-${rowIndex}`"
      class="osk__row"
    >
      <button
        v-for="keyObj in row"
        :key="`key-${keyObj.key}`"
        tabindex="-1"
        :data-key="keyObj.key"
        @click="typeGuess(keyObj.key.toUpperCase())"
      >
        <template v-if="keyObj.key === 'backspace'">
          <img
            src="https://cdn.onlinewebfonts.com/svg/img_389509.svg"
            alt="backspace"
          />
        </template>
        <template v-else>
          {{ keyObj.key }}
        </template>
      </button>
    </div>
  </div>
</template>
