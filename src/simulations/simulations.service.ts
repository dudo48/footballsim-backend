import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import MatchSimulator from 'src/simulations/simulations.match-simulator';
import { TeamEntity } from 'src/teams/entities/team.entity';
import { Repository } from 'typeorm';
import { SimulateMatchDto } from './dto/simulate-match.dto';

@Injectable()
export class SimulationsService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepository: Repository<TeamEntity>,
  ) {}

  async simulateMatch(match: SimulateMatchDto, n: number) {
    const homeTeam = await this.teamRepository.findOneBy({
      id: match.homeTeam,
    });
    const awayTeam = await this.teamRepository.findOneBy({
      id: match.awayTeam,
    });

    if (!homeTeam || !awayTeam) {
      throw new NotFoundException();
    }

    return [...Array(n)].map(() =>
      MatchSimulator.simulate({ ...match, homeTeam, awayTeam }),
    );
  }
}
