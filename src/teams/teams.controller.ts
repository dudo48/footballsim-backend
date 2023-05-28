import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Post('multiple')
  createMultiple(
    @Body(new ParseArrayPipe({ items: CreateTeamDto })) teams: CreateTeamDto[],
  ) {
    return this.teamsService.createMultiple(teams);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get('random')
  createRandomTeam(
    @Query('n') n: string,
    @Query('k') k: string,
    @Query('a') a: string,
  ) {
    return this.teamsService.createRandomTeams(
      Math.max(+n, 1) || 1,
      Math.max(+k, 1) || 1,
      Math.max(+a, 1) || 4,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }
}
