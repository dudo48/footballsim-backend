import MatchResult from 'shared/interfaces/matchResult.interface';

export function getTotalGoals(result?: MatchResult, withPenalties = false) {
  if (!result) return { home: 0, away: 0 };

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

// from the vantage point of the home team
export function isWin(result?: MatchResult) {
  if (!result) throw new Error('result is undefined');
  const goals = getTotalGoals(result, true);
  return goals.home > goals.away;
}

export function isDraw(result?: MatchResult) {
  if (!result) throw new Error('result is undefined');
  const goals = getTotalGoals(result, true);
  return goals.home === goals.away;
}

export function isLoss(result?: MatchResult) {
  if (!result) throw new Error('result is undefined');
  const goals = getTotalGoals(result, true);
  return goals.home < goals.away;
}
