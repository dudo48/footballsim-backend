import Match from 'shared/interfaces/match.interface';
import { isLoss, isWin } from './result.functions';

export function getWinner(match: Match) {
  const result = match.result;
  if (!result) throw new Error('result is undefined');

  if (isWin(result)) {
    return match.homeTeam;
  } else if (isLoss(result)) {
    return match.awayTeam;
  }

  return null;
}
