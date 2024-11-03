import { mount } from '@vue/test-utils';
import WordleBoard from '../WordleBoard.vue';

import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/settings';

describe('WordleBoard', () => {
  const wordOfTheDay = 'TESTS';
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(WordleBoard, { props: { wordOfTheDay } });
  });

  async function playerSubmitGuess(guess: string) {
    const guessInput = wrapper.find('input[type="text"]');
    await guessInput.setValue(guess);
    await guessInput.trigger('keydown.enter');
  }

  test('a victory message appears when user makes a guess that matches the word of the day', async () => {
    await playerSubmitGuess(wordOfTheDay);

    expect(wrapper.text()).toContain(VICTORY_MESSAGE);
  });

  test('a defeat message appears if the user makes a guess that is incorrect', async () => {
    await playerSubmitGuess('WRONG');

    expect(wrapper.text()).toContain(DEFEAT_MESSAGE);
  });

  test('no end-of-game message appears if the user has not yet made a guess', async () => {
    expect(wrapper.text()).not.toContain(VICTORY_MESSAGE);
    expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE);
  });

  test('if a word of the day provided does not have exactly 5 character, a warning is emitted', async () => {
    vi.spyOn(console, 'warn');

    mount(WordleBoard, { props: { wordOfTheDay: 'FLY' } });

    expect(console.warn).toHaveBeenCalled();
  });
});
