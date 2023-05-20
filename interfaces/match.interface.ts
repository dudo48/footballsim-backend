import Team from './team.interface';

export default interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  onNeutralGround: boolean;
}
