import { mount } from '@vue/test-utils';
import WordleBoard from '../WordleBoard.vue';

import {
  DEFEAT_MESSAGE,
  MAX_GUESS_COUNT,
  VICTORY_MESSAGE,
  WORD_SIZE,
} from '@/settings';

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

  describe('End of the game messages', () => {
    test('a victory message appears when user makes a guess that matches the word of the day', async () => {
      await playerSubmitGuess(wordOfTheDay);

      expect(wrapper.text()).toContain(VICTORY_MESSAGE);
    });

    describe.each(
      Array.from({ length: MAX_GUESS_COUNT + 1 }, (_, numberOfGuesses) => ({
        numberOfGuesses,
        shouldSeeDefeatMessage: numberOfGuesses === MAX_GUESS_COUNT,
      }))
    )(
      `a defeat message should appear if the player makes incorrect guesses ${MAX_GUESS_COUNT} times in a row`,
      async ({ numberOfGuesses, shouldSeeDefeatMessage }) => {
        test(`therefore for ${numberOfGuesses} guess(es), a defeat message should ${
          shouldSeeDefeatMessage ? '' : 'not'
        } appear`, async () => {
          for (let i = 0; i < numberOfGuesses; i++) {
            await playerSubmitGuess('WRONG');
          }

          if (shouldSeeDefeatMessage) {
            expect(wrapper.text()).toContain(DEFEAT_MESSAGE);
          } else {
            expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE);
          }
        });
      }
    );

    test('no end-of-game message appears if the user has not yet made a guess', async () => {
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE);
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE);
    });
  });

  describe('Rules for defining the word of the day', () => {
    beforeEach(() => {
      // const spy = vi.spyOn(console, 'warn');
      // spy.mockImplementation(() => null);
      console.warn = vi.fn();
    });

    test.each([
      { wordOfTheDay: 'FLY', reason: 'must have 5 characters' },
      { wordOfTheDay: 'tests', reason: 'must be all in uppercase' },
      { wordOfTheDay: 'QWERT', reason: 'must be a valid english word' },
    ])(
      'since $reason: $wordOfTheDay is invalid, therefore a warning must be emitted',
      async ({ wordOfTheDay }) => {
        mount(WordleBoard, { props: { wordOfTheDay } });

        expect(console.warn).toHaveBeenCalled();
      }
    );

    test('no warnings is emitted if the word of the day provided is a real uppercase english with five characters', async (wordOfTheDay) => {
      mount(WordleBoard, { props: { wordOfTheDay: 'TESTS' } });

      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  describe('Player input', () => {
    test('remains in focus the entire time', async () => {
      document.body.innerHTML = '<div id="app"></div>';
      wrapper = mount(WordleBoard, {
        props: { wordOfTheDay },
        attachTo: '#app',
      });

      const guessInput = wrapper.find('input[type="text"]');
      expect(guessInput.attributes('autofocus')).not.toBeUndefined();

      await guessInput.trigger('blur');

      expect(document.activeElement).toBe(guessInput.element);
    });

    test(`player guesses are limited to ${WORD_SIZE} letters`, async () => {
      await playerSubmitGuess(wordOfTheDay + 'EXTRA');

      expect(wrapper.text()).toContain(VICTORY_MESSAGE);
    });

    test('player guesses can only be submitted if they are real words', async () => {
      await playerSubmitGuess('QWERT');

      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE);
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE);
    });

    test('player guesses are not case sensitive', async () => {
      await playerSubmitGuess(wordOfTheDay.toLowerCase());

      expect(wrapper.text()).toContain(VICTORY_MESSAGE);
    });

    test('player guesses can only contain letters', async () => {
      await playerSubmitGuess('H3!RT');

      expect(
        wrapper.find<HTMLInputElement>('input[type="text"]').element.value
      ).toEqual('HRT');
    });

    test('non-letters characters do not render on the screen while being typed', async () => {
      await playerSubmitGuess('12');
      await playerSubmitGuess('123');

      expect(
        wrapper.find<HTMLInputElement>('input[type="text"]').element.value
      ).toEqual('');
    });
  });
});
