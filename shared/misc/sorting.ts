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

export const sorts = {
  team: {
    default: () => 0,
    name: (a: Team, b: Team) => a.name.localeCompare(b.name),
    attack: (a: Team, b: Team) => a.attack - b.attack,
    defense: (a: Team, b: Team) => a.defense - b.defense,
    homeAdvantage: (a: Team, b: Team) => a.homeAdvantage - b.homeAdvantage,
    strength: (a: Team, b: Team) => getStrength(a) - getStrength(b),
  },
  match: {
    default: () => 0,
    id: (a: Match, b: Match) => a.id - b.id,
    result: (a: Required<Match>, b: Required<Match>) =>
      getTotalGoalsDiff(a.result, true) - getTotalGoalsDiff(b.result, true) ||
      Math.max(getTotalGoals(a.result).home, getTotalGoals(a.result).away) -
        Math.max(getTotalGoals(b.result).home, getTotalGoals(b.result).away),
    strength: (a: Match, b: Match) => getMatchStrength(a) - getMatchStrength(b),
    goals: (a: Required<Match>, b: Required<Match>) =>
      getSummedGoals(a.result) - getSummedGoals(b.result) ||
      Math.max(getTotalGoals(a.result).home, getTotalGoals(a.result).away) -
        Math.max(getTotalGoals(b.result).home, getTotalGoals(b.result).away),
  },
  ranking: {
    default: () => 0,
    position: (a: Ranking, b: Ranking) => a.position - b.position,
    teamName: (a: Ranking, b: Ranking) =>
      a.team.name.localeCompare(b.team.name),
    matchesPlayed: (a: Ranking, b: Ranking) =>
      a.matchesPlayed - b.matchesPlayed,
    wins: (a: Ranking, b: Ranking) => a.wins - b.wins,
    draws: (a: Ranking, b: Ranking) => a.draws - b.draws,
    losses: (a: Ranking, b: Ranking) => a.losses - b.losses,
    goalsFor: (a: Ranking, b: Ranking) => a.goalsFor - b.goalsFor,
    goalsAgainst: (a: Ranking, b: Ranking) => a.goalsAgainst - b.goalsAgainst,
    goalsDiff: (a: Ranking, b: Ranking) => getGoalsDiff(a) - getGoalsDiff(b),
    points: (a: Ranking, b: Ranking) => a.points - b.points,

    // complex sorts
    standard: (a: Ranking, b: Ranking) =>
      b.points - a.points ||
      getGoalsDiff(b) - getGoalsDiff(a) ||
      b.goalsFor - a.goalsFor ||
      a.team.name.localeCompare(b.team.name),
  },
};
