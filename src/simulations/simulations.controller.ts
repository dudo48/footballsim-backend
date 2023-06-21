import { Body, Controller, Post, Query } from '@nestjs/common';
import { CreateMatchDto } from 'src/simulations/dto/create-match.dto';
import { MAX_SIMULATIONS, MIN_SIMULATIONS } from 'src/utils/constants';
import { SimulationsService } from './simulations.service';
import { CreateCupDto } from './dto/create-cup.dto';

@Controller('simulate')
export class SimulationsController {
  constructor(private readonly simulationsService: SimulationsService) {}

  @Post('match')
  simulateMatch(@Body() match: CreateMatchDto, @Query('n') n: string) {
    const simulationsNumber =
      Math.min(Math.max(+n, MIN_SIMULATIONS), MAX_SIMULATIONS) ||
      MIN_SIMULATIONS;
    return this.simulationsService.simulateMatch(match, simulationsNumber);
  }

  @Post('cup')
  simulateCup(@Body() cup: CreateCupDto) {
    return this.simulationsService.simulateCup(cup);
  }
}
