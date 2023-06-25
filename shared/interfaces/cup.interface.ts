import Round from './round.interface';
import Standings from './standings.interface';
import Team from './team.interface';

export default interface Cup {
  id?: number;
  teams: Team[];
  seeds: number;
  allowExtraTime: boolean;
  result?: {
    rounds: Round[];

    // all standings from before start of competition to its end
    allStandings: Standings[];
  };
}
