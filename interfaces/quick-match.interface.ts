import MatchResult from './matchResult.interface';

export default interface QuickMatch {
  homeTeam: number;
  awayTeam: number;
  result?: MatchResult;
  onNeutralGround: boolean;
}
