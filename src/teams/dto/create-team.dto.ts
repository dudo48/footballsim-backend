import { IsHexColor, IsNumber, IsPositive, MinLength } from 'class-validator';

export class CreateTeamDto {
  @MinLength(3)
  name: string;

  @IsNumber()
  @IsPositive()
  attack: number;

  @IsNumber()
  @IsPositive()
  defense: number;

  @IsNumber()
  @IsPositive()
  homeAdvantage: number;

  @IsHexColor()
  color: string;
}
