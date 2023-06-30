import { colord } from 'colord';
import random from 'random/dist/cjs/random';
import { MIN_STRENGTH } from 'src/utils/constants';

interface TeamGenerationParameters {
  names: string[];
  strength: number;
  alpha: number;
}

export default class RandomTeamsGenerator {
  static generate(data: TeamGenerationParameters) {
    const pareto = random.pareto(data.alpha);

    // multiply by two so that the mean is 1 not 0.5
    const noise = () => random.bates(16)() * 2;

    const teams = data.names.map((name) => {
      // attack and defense are related
      const strength = pareto() * data.strength;
      const attack = Math.max(+(strength * noise()).toFixed(1), MIN_STRENGTH);
      const defense = Math.max(+(strength * noise()).toFixed(1), MIN_STRENGTH);

      return {
        name,
        attack,
        defense,
        homeAdvantage: 1.2,
        color: colord(
          `hsl(
          ${random.int(0, 255)},
          ${random.int(80, 100)}%,
          ${random.int(0, 100)}%
          )`,
        ).toHex(),
      };
    });

    return teams;
  }
}
