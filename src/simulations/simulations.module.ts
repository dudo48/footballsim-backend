import { Module } from '@nestjs/common';
import { SimulationsService } from './simulations.service';
import { SimulationsController } from './simulations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchEntity } from 'src/matches/entities/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MatchEntity])],
  controllers: [SimulationsController],
  providers: [SimulationsService],
})
export class SimulationsModule {}
