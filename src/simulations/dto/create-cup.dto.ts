import { IsNotEmpty } from 'class-validator';
import { TeamEntity } from 'src/teams/entities/team.entity';

export class CreateCupDto {
  @IsNotEmpty()
  teams: TeamEntity[];
}
