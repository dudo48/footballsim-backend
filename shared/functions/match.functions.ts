import Match, { MatchResult } from 'shared/interfaces/match.interface';
import { getStrength } from './team.functions';

export function getWinner(match: Required<Match>) {
  if (isDraw(match.result)) return null;
  return isWin(match.result) ? match.homeTeam : match.awayTeam;
}

export function getLoser(match: Required<Match>) {
  if (isDraw(match.result)) return null;
  return isLoss(match.result) ? match.homeTeam : match.awayTeam;
}

export function getAwayMatch(match: Match) {
  return {
    ...match,
    homeTeam: match.awayTeam,
    awayTeam: match.homeTeam,
  } as Match;
}

export function getMatchStrength(match: Match) {
  return getStrength(match.homeTeam) + getStrength(match.awayTeam);
}

export function getTotalGoals(result: MatchResult, withPenalties = false) {
  const home =
    result.standardTime.home +
    (result.extraTime?.home || 0) +
    ((withPenalties && result.penaltyShootout?.home) || 0);

  const away =
    result.standardTime.away +
    (result.extraTime?.away || 0) +
    ((withPenalties && result.penaltyShootout?.away) || 0);

  return { home, away };
}

export function getTotalGoalsDiff(result: MatchResult, withPenalties = false) {
  const totalGoals = getTotalGoals(result, withPenalties);
  return totalGoals.home - totalGoals.away;
}

export function getSummedGoals(result: MatchResult, withPenalties = false) {
  const totalGoals = getTotalGoals(result, withPenalties);
  return totalGoals.home + totalGoals.away;
}

// from the vantage point of the home team
export function isWin(result: MatchResult) {
  const goals = getTotalGoals(result, true);
  return goals.home > goals.away;
}

export function isDraw(result: MatchResult) {
  const goals = getTotalGoals(result, true);
  return goals.home === goals.away;
}

export function isLoss(result: MatchResult) {
  const goals = getTotalGoals(result, true);
  return goals.home < goals.away;
}
