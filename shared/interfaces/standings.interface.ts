import Ranking from './ranking.interface';

export default interface Standings {
  roundId: number;
  table: Ranking[];
}
