import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from 'src/teams/entities/team.entity';
import { SimulationsController } from './simulations.controller';
import { SimulationsService } from './simulations.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity])],
  controllers: [SimulationsController],
  providers: [SimulationsService],
})
export class SimulationsModule {}
