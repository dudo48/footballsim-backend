import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private readonly repository: Repository<Team>,
  ) {}

  create(createTeamDto: CreateTeamDto) {
    this.repository.save(createTeamDto);
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
