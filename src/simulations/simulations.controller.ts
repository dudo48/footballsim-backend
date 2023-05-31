import { Body, Controller, Post, Query } from '@nestjs/common';
import { MAX_SIMULATIONS, MIN_SIMULATIONS } from 'src/utils/constants';
import { QuickMatchDto } from './dto/quick-match.dto';
import { SimulationsService } from './simulations.service';

@Controller('simulations')
export class SimulationsController {
  constructor(private readonly simulationsService: SimulationsService) {}

  @Post('matches/quick')
  simulateMatch(@Body() match: QuickMatchDto, @Query('n') n: string) {
    return this.simulationsService.simulateQuickMatch(
      match,
      Math.min(Math.max(+n, MIN_SIMULATIONS), MAX_SIMULATIONS) ||
        MIN_SIMULATIONS,
    );
  }
}
