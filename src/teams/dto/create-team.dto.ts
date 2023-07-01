import {
  IsHexColor,
  IsNumber,
  IsPositive,
  Min,
  MinLength,
} from 'class-validator';

export class CreateTeamDto {
  @MinLength(3)
  name: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  attack: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  defense: number;

  @IsNumber()
  @IsPositive()
  homeAdvantage: number;

  @IsHexColor()
  color: string;
}
