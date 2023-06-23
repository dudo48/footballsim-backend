import Round from './round.interface';
import Team from './team.interface';

export default interface Cup {
  id?: number;
  teams: Team[];
  seeds: number;
  allowExtraTime: boolean;
  result?: {
    rounds: Round[];
  };
}
