import Team from 'shared/interfaces/team.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TeamEntity implements Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'float',
    transformer: {
      to(value) {
        // const v = Math.min(Math.max(value, MIN_STRENGTH), MAX_STRENGTH);
        return value.toFixed(1);
      },
      from(value) {
        return value;
      },
    },
  })
  attack: number;

  @Column({
    type: 'float',
    transformer: {
      to(value) {
        // const v = Math.min(Math.max(value, MIN_STRENGTH), MAX_STRENGTH);
        return value.toFixed(1);
      },
      from(value) {
        return value;
      },
    },
  })
  defense: number;

  @Column({
    name: 'home_advantage',
    type: 'float',
    transformer: {
      to(value) {
        return value.toFixed(1);
      },
      from(value) {
        return value;
      },
    },
  })
  homeAdvantage: number;

  @Column({ default: '#ffffff' })
  color: string;
}
