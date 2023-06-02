import { Body, Controller, Post, Query } from '@nestjs/common';
import { CreateMatchDto } from 'src/matches/dto/create-match.dto';
import { MAX_SIMULATIONS, MIN_SIMULATIONS } from 'src/utils/constants';
import { SimulationsService } from './simulations.service';

@Controller('simulations')
export class SimulationsController {
  constructor(private readonly simulationsService: SimulationsService) {}

  @Post('matches')
  simulateMatch(@Body() match: CreateMatchDto, @Query('n') n: string) {
    return this.simulationsService.simulateMatch(
      match,
      Math.min(Math.max(+n, MIN_SIMULATIONS), MAX_SIMULATIONS) ||
        MIN_SIMULATIONS,
    );
  }
}
