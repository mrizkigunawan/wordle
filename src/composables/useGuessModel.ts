import { ref } from 'vue';

const guessInProgress = ref<string | null>(null);

export function useGuessModel() {
  return { guessInProgress };
}
