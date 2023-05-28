import { Body, Controller, Post, Query } from '@nestjs/common';
import { SimulateMatchDto } from './dto/simulate-match.dto';
import { SimulationsService } from './simulations.service';

@Controller('simulations')
export class SimulationsController {
  constructor(private readonly simulationsService: SimulationsService) {}

  @Post('match')
  simulateMatch(@Body() match: SimulateMatchDto, @Query('n') n: string) {
    return this.simulationsService.simulateMatch(match, Math.max(+n, 1) || 1);
  }
}
