import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../../domain/user.entity';
import { BaseEntity } from '@/config/database/domain/base.entity';

@Entity('profiles')
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    name: 'pin',
    type: 'varchar',
    length: 4,
    nullable: true,
  })
  pin?: string;

  @Column({ name: 'user_fk_id', type: 'uuid' })
  userFkId: string;

  @ManyToOne(() => User, (user) => user.profiles)
  @JoinColumn({ name: 'user_fk_id' })
  user: User;
}
