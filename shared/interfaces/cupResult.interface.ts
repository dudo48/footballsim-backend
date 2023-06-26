import Round from './round.interface';
import Standings from './standings.interface';

export default interface CupResult {
  rounds: Round[];

  // all standings from before start of competition to its end
  allStandings: Standings[];
}
