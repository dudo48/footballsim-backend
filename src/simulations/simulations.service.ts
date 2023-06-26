import { Injectable } from '@nestjs/common';
import Cup from 'shared/interfaces/cup.interface';
import Match from 'shared/interfaces/match.interface';
import CupSimulator from 'src/simulators/simulator.cup';
import MatchSimulator from 'src/simulators/simulator.match';
import { CreateCupDto } from './dto/create-cup.dto';
import { CreateMatchDto } from './dto/create-match.dto';

@Injectable()
export class SimulationsService {
  async simulateMatch(match: CreateMatchDto, n: number) {
    return [...Array(n)].map((_, i) => ({
      ...match,
      id: i + 1,
      result: MatchSimulator.simulate(match as Match),
    })) as Match[];
  }

  async simulateCup(cup: CreateCupDto, n: number) {
    return [...Array(n)].map((_, i) => ({
      ...cup,
      id: i + 1,
      result: CupSimulator.simulate(cup as Cup),
    })) as Cup[];
  }
}
