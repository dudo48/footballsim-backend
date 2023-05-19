import { Team } from './team.interface';

export interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  onNeutralGround: boolean;
}
