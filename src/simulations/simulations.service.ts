import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchEntity } from 'src/matches/entities/match.entity';
import MatchSimulator from 'src/utils/simulator';
import { Repository } from 'typeorm';

@Injectable()
export class SimulationsService {
  constructor(
    @InjectRepository(MatchEntity)
    private readonly matchesRepository: Repository<MatchEntity>,
  ) {}

  async simulate(id: number, n: number) {
    const match = await this.matchesRepository.findOneBy({ id });

    if (!match) {
      throw new NotFoundException();
    }

    return [...Array(n)].map(() => MatchSimulator.simulate(match));
  }
}
