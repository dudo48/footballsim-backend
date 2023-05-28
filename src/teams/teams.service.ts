import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import random from 'random/dist/cjs/random';
import { NameEntity } from 'src/teams/entities/name.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamEntity } from './entities/team.entity';
import RandomTeamsGenerator from './teams.random';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly repository: Repository<TeamEntity>,
    @InjectRepository(NameEntity)
    private readonly nameRepository: Repository<NameEntity>,
  ) {}

  create(createTeamDto: CreateTeamDto) {
    return this.repository.save(createTeamDto);
  }

  createMultiple(teams: CreateTeamDto[]) {
    return this.repository.save(teams);
  }

  async createRandomTeams(n: number, strength: number, alpha: number) {
    // get random names first
    const names = await this.nameRepository.find();
    const randomNames = [...Array(n)].map(
      () => names[random.int(0, names.length - 1)].name,
    );
    return RandomTeamsGenerator.generate({
      names: randomNames,
      strength,
      alpha,
    });
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.repository.update({ id }, updateTeamDto);
  }

  remove(id: number) {
    return this.repository.delete({ id });
  }
}
