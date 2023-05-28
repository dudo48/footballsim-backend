import { IsBoolean, IsNotEmpty } from 'class-validator';

export class QuickMatchDto {
  @IsNotEmpty()
  homeTeam: number;

  @IsNotEmpty()
  awayTeam: number;

  @IsBoolean()
  onNeutralGround: boolean;
}
