import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchEntity } from './entities/match.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(MatchEntity)
    private readonly repository: Repository<MatchEntity>,
  ) {}

  create(createMatchDto: CreateMatchDto) {
    return this.repository.save(createMatchDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return this.repository.update({ id }, updateMatchDto);
  }

  remove(id: number) {
    return this.repository.delete({ id });
  }
}
