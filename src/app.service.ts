import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFile } from 'fs';
import { Repository } from 'typeorm';
import { NameEntity } from './teams/entities/name.entity';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(NameEntity)
    private readonly nameRepository: Repository<NameEntity>,
  ) {}

  // seeding initial data
  onApplicationBootstrap() {
    readFile('./teams-names.txt', 'utf8', (err, data) => {
      const names = data.split(/\n+/).map((name) => ({
        name,
      }));

      this.nameRepository.save(names);
    });
  }
}
