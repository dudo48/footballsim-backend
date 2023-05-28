import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from 'src/matches/dto/create-match.dto';
import MatchSimulator from 'src/simulations/simulations.match-simulator';

@Injectable()
export class SimulationsService {
  async simulateMatch(match: CreateMatchDto, n: number) {
    return [...Array(n)].map(() => MatchSimulator.simulate(match));
  }
}
