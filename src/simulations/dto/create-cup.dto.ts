import { IsArray, IsBoolean, IsNumber } from 'class-validator';
import { TeamEntity } from 'src/teams/entities/team.entity';

export class CreateCupDto {
  @IsArray()
  teams: TeamEntity[];

  @IsArray()
  hosts: TeamEntity[];

  @IsNumber()
  seeds: number;

  @IsBoolean()
  allowExtraTime: boolean;
}
