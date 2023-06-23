import { Injectable } from '@nestjs/common';
import Cup from 'shared/interfaces/cup.interface';
import Match from 'shared/interfaces/match.interface';
import CupSimulator from 'src/simulators/simulator.cup';
import MatchSimulator from 'src/simulators/simulator.match';

@Injectable()
export class SimulationsService {
  async simulateMatch(match: Match, n: number) {
    return [...Array(n)].map((_, i) => ({
      id: i + 1,
      ...match,
      result: MatchSimulator.simulate(match),
    })) as Match[];
  }

  async simulateCup(cup: Cup, n: number) {
    return [...Array(n)].map((_, i) => ({
      id: i + 1,
      ...cup,
      result: { rounds: CupSimulator.simulate(cup) },
    })) as Cup[];
  }
}
