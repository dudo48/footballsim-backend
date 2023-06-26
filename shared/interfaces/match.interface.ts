import Result from './result.interface';
import Team from './team.interface';

export interface MatchResult {
  standardTime: Result;
  extraTime?: Result;
  penaltyShootout?: Result;
}

export default interface Match {
  id: number;
  awayTeam: Team;
  homeTeam: Team;

  onNeutralGround: boolean;
  allowExtraTime: boolean;
  isKnockout: boolean;

  result?: MatchResult;
}
