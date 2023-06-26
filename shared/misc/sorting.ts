import Ranking from 'shared/interfaces/ranking.interface';
import Team from 'shared/interfaces/team.interface';
import { getGoalsDiff } from '../functions/ranking.functions';
import { getStrength } from '../functions/team.functions';

export const teamSorts: { [key: string]: (a: Team, b: Team) => number } = {
  lastAdded: () => 0,
  name: (a, b) => a.name.localeCompare(b.name),
  attack: (a, b) => a.attack - b.attack,
  defense: (a, b) => a.defense - b.defense,
  homeAdvantage: (a, b) => a.homeAdvantage - b.homeAdvantage,
  strength: (a, b) => getStrength(a) - getStrength(b),
};

export const rankingSorts: {
  [key: string]: (a: Ranking, b: Ranking) => number;
} = {
  goalsDiff: (a, b) =>
    b.points - a.points ||
    getGoalsDiff(b) - getGoalsDiff(a) ||
    b.goalsFor - a.goalsFor ||
    a.team.name.localeCompare(b.team.name),
};
