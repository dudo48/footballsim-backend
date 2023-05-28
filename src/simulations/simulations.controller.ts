import { Body, Controller, Post, Query } from '@nestjs/common';
import { CreateMatchDto } from 'src/matches/dto/create-match.dto';
import { SimulationsService } from './simulations.service';

@Controller('simulations')
export class SimulationsController {
  constructor(private readonly simulationsService: SimulationsService) {}

  @Post('match')
  simulateMatch(@Body() match: CreateMatchDto, @Query('n') n: string) {
    return this.simulationsService.simulateMatch(match, Math.max(+n, 1) || 1);
  }
}
