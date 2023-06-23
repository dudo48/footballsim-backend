import { Body, Controller, Post, Query } from '@nestjs/common';
import { CreateMatchDto } from 'src/simulations/dto/create-match.dto';
import {
  MAX_COMPETITION_SIMULATIONS,
  MAX_MATCH_SIMULATIONS,
  MIN_COMPETITION_SIMULATIONS,
  MIN_MATCH_SIMULATIONS,
} from 'src/utils/constants';
import { CreateCupDto } from './dto/create-cup.dto';
import { SimulationsService } from './simulations.service';

@Controller('simulate')
export class SimulationsController {
  constructor(private readonly simulationsService: SimulationsService) {}

  @Post('match')
  simulateMatch(@Body() match: CreateMatchDto, @Query('n') n: string) {
    const simulationsNumber =
      Math.min(Math.max(+n, MIN_MATCH_SIMULATIONS), MAX_MATCH_SIMULATIONS) ||
      MIN_MATCH_SIMULATIONS;
    return this.simulationsService.simulateMatch(match, simulationsNumber);
  }

  @Post('cup')
  simulateCup(@Body() cup: CreateCupDto, @Query('n') n: string) {
    const simulationsNumber =
      Math.min(
        Math.max(+n, MIN_COMPETITION_SIMULATIONS),
        MAX_COMPETITION_SIMULATIONS,
      ) || MIN_MATCH_SIMULATIONS;
    return this.simulationsService.simulateCup(cup, simulationsNumber);
  }
}
