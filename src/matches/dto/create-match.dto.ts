import { IsBoolean, IsNotEmpty } from 'class-validator';
import { TeamEntity } from 'src/teams/entities/team.entity';

export class CreateMatchDto {
  @IsNotEmpty()
  homeTeam: TeamEntity;

  @IsNotEmpty()
  awayTeam: TeamEntity;

  @IsBoolean()
  onNeutralGround: boolean;
}
