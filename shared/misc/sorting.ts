import Match from 'shared/interfaces/match.interface';
import Ranking from 'shared/interfaces/ranking.interface';
import Team from 'shared/interfaces/team.interface';
import {
  getMatchStrength,
  getSummedGoals,
  getTotalGoals,
  getTotalGoalsDiff,
} from '../functions/match.functions';
import { getGoalsDiff } from '../functions/ranking.functions';
import { getStrength } from '../functions/team.functions';

export const teamSorts: { [key: string]: (a: Team, b: Team) => number } = {
  default: () => 0,
  name: (a, b) => a.name.localeCompare(b.name),
  attack: (a, b) => a.attack - b.attack,
  defense: (a, b) => a.defense - b.defense,
  homeAdvantage: (a, b) => a.homeAdvantage - b.homeAdvantage,
  strength: (a, b) => getStrength(a) - getStrength(b),
};

export const matchSorts: { [key: string]: (a: Match, b: Match) => number } = {
  default: () => 0,
  id: (a, b) => a.id - b.id,
  result: (a: Required<Match>, b: Required<Match>) =>
    getTotalGoalsDiff(a.result, true) - getTotalGoalsDiff(b.result, true) ||
    Math.max(getTotalGoals(a.result).home, getTotalGoals(a.result).away) -
      Math.max(getTotalGoals(b.result).home, getTotalGoals(b.result).away),
  strength: (a, b) => getMatchStrength(a) - getMatchStrength(b),
  goals: (a: Required<Match>, b: Required<Match>) =>
    getSummedGoals(a.result) - getSummedGoals(b.result) ||
    Math.max(getTotalGoals(a.result).home, getTotalGoals(a.result).away) -
      Math.max(getTotalGoals(b.result).home, getTotalGoals(b.result).away),
};

export const rankingSorts: {
  [key: string]: (a: Ranking, b: Ranking) => number;
} = {
  default: () => 0,
  position: (a, b) => a.position - b.position,
  teamName: (a, b) => a.team.name.localeCompare(b.team.name),
  matchesPlayed: (a, b) => a.matchesPlayed - b.matchesPlayed,
  wins: (a, b) => a.wins - b.wins,
  draws: (a, b) => a.draws - b.draws,
  losses: (a, b) => a.losses - b.losses,
  goalsFor: (a, b) => a.goalsFor - b.goalsFor,
  goalsAgainst: (a, b) => a.goalsAgainst - b.goalsAgainst,
  goalsDiff: (a, b) => getGoalsDiff(a) - getGoalsDiff(b),
  points: (a, b) => a.points - b.points,

  // complex sorts
  standard: (a, b) =>
    b.points - a.points ||
    getGoalsDiff(b) - getGoalsDiff(a) ||
    b.goalsFor - a.goalsFor ||
    a.team.name.localeCompare(b.team.name),
};
