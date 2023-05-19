import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  attack: number;

  @IsNumber()
  @IsOptional()
  defense: number;

  @IsNumber()
  @IsOptional()
  homeAdvantage: number;
}
