import { Transform } from 'class-transformer';
import Team from 'interfaces/team.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TeamEntity implements Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'real', default: 1 })
  @Transform(({ value }) => +value.toFixed(1))
  attack: number;

  @Column({ type: 'real', default: 1 })
  @Transform(({ value }) => +value.toFixed(1))
  defense: number;

  @Column({ name: 'home_advantage', type: 'real', default: 1.2 })
  @Transform(({ value }) => +value.toFixed(1))
  homeAdvantage: number;

  @Column({ default: '#ffffff' })
  color: string;
}
