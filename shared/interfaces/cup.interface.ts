import Round from './round.interface';
import Standings from './standings.interface';
import Team from './team.interface';

export interface CupResult {
  rounds: Round[];

  // all standings from before start of competition to its end
  allStandings: Standings[];
}

export default interface Cup {
  id: number;
  teams: Team[];
  hosts: Team[];
  seeds: number;
  allowExtraTime: boolean;
  result?: CupResult;
}
