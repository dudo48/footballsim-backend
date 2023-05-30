import MatchResult from './matchResult.interface';
import Team from './team.interface';

export default interface Match {
  id?: number;
  homeTeam: Team;
  awayTeam: Team;
  result?: MatchResult;
  onNeutralGround: boolean;
}
