import Name from 'interfaces/name.interface';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class NameEntity implements Name {
  @PrimaryColumn()
  name: string;
}
