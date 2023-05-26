import { Controller, Get, Query } from '@nestjs/common';
import { RandomService } from './random.service';

@Controller('random')
export class RandomController {
  constructor(private readonly randomService: RandomService) {}

  @Get('teams')
  createRandomTeam(
    @Query('n') n: string,
    @Query('k') k: string,
    @Query('a') a: string,
  ) {
    return this.randomService.createRandomTeams(
      Math.max(+n, 1) || 1,
      Math.max(+k, 1) || 1,
      Math.max(+a, 1) || 4,
    );
  }
}
