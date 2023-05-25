import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamEntity } from './entities/team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly repository: Repository<TeamEntity>,
  ) {}

  create(createTeamDto: CreateTeamDto) {
    return this.repository.save(createTeamDto);
  }

  createMultiple(teams: CreateTeamDto[]) {
    return this.repository.save(teams);
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
