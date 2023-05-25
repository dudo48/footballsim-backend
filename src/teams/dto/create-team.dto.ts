import { IsHexColor, IsNotEmpty, IsNumber, IsOptional, IsPositive, MinLength } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  attack: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  defense: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  homeAdvantage: number;

  @IsNotEmpty()
  @IsHexColor()
  @IsOptional()
  color: string;
}
