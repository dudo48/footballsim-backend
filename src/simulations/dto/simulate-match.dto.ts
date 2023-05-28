import { IsBoolean, IsNotEmpty } from 'class-validator';

export class SimulateMatchDto {
  @IsNotEmpty()
  homeTeam: number;

  @IsNotEmpty()
  awayTeam: number;

  @IsBoolean()
  onNeutralGround: boolean;
}
