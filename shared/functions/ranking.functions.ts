import Ranking from 'shared/interfaces/ranking.interface';

export function getGoalsDiff(ranking: Ranking) {
  return ranking.goalsFor - ranking.goalsAgainst;
}
