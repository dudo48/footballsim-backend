import { Controller, Get, Param, Query } from '@nestjs/common';
import { SimulationsService } from './simulations.service';

@Controller('simulations')
export class SimulationsController {
  constructor(private readonly simulationsService: SimulationsService) {}

  @Get(':id')
  simulate(@Param('id') id: string, @Query('n') n: string) {
    return this.simulationsService.simulate(+id, Math.max(+n, 1) || 1);
  }
}
