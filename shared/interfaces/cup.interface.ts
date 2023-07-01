import Round from './round.interface';
import Team from './team.interface';

export interface CupResult {
  rounds: Round[];
}

export default interface Cup {
  id: number;
  teams: Team[];
  hosts: Team[];
  seeds: number;
  allowExtraTime: boolean;
  result?: CupResult;
}
