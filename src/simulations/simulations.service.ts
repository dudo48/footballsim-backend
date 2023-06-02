import { Injectable } from '@nestjs/common';
import Match from 'interfaces/match.interface';
import MatchSimulator from 'src/simulations/simulations.match-simulator';

@Injectable()
export class SimulationsService {
  async simulateMatch(match: Match, n: number) {
    return [...Array(n)].map((_, i) => ({
      id: i + 1,
      ...match,
      result: MatchSimulator.simulate(match),
    }));
  }
}
