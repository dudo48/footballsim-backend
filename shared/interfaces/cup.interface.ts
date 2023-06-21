import Round from './round.interface';
import Team from './team.interface';

export default interface Cup {
  id?: number;
  teams: Team[];
  result?: {
    rounds: Round[];
  };
}
