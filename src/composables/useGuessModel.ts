import { ref } from 'vue';

const guessInProgress = ref<string | null>(null);
const guessSubmitted = ref<string[]>([]);

export function useGuessModel() {
  const resetGuessModel = () => {
    guessInProgress.value = null;
    guessSubmitted.value = [];
  };

  return { guessInProgress, guessSubmitted, resetGuessModel };
}
