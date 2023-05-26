import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import random from 'random/dist/cjs/random';
import { Repository } from 'typeorm';
import { NameEntity } from './entities/name.entity';
import RandomTeamsGenerator from './random.teams';

@Injectable()
export class RandomService {
  constructor(
    @InjectRepository(NameEntity)
    private readonly nameRepository: Repository<NameEntity>,
  ) {}

  async createRandomTeams(n: number, strength: number, alpha: number) {
    // get random names first
    const names = await this.nameRepository.find();
    const randomNames = [...Array(n).keys()].map(
      () => names[random.int(0, names.length - 1)].name,
    );
    return RandomTeamsGenerator.generate({
      names: randomNames,
      strength,
      alpha,
    });
  }
}
