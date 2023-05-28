import { Body, Controller, Post, Query } from '@nestjs/common';
import { QuickMatchDto } from './dto/quick-match.dto';
import { SimulationsService } from './simulations.service';

@Controller('simulations')
export class SimulationsController {
  constructor(private readonly simulationsService: SimulationsService) {}

  @Post('matches/quick')
  simulateMatch(@Body() match: QuickMatchDto, @Query('n') n: string) {
    return this.simulationsService.simulateQuickMatch(
      match,
      Math.max(+n, 1) || 1,
    );
  }
}
