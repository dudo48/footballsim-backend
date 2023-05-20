import Match from 'interfaces/match.interface';
import { TeamEntity } from 'src/teams/entities/team.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MatchEntity implements Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TeamEntity, { eager: true })
  homeTeam: TeamEntity;

  @ManyToOne(() => TeamEntity, { eager: true })
  awayTeam: TeamEntity;

  @Column({ default: false })
  onNeutralGround: boolean;
}
