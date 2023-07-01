import Match from './match.interface';
import Ranking from './ranking.interface';

export default interface Round {
  id: number;
  matches: Match[];
  standings: Ranking[];
}
