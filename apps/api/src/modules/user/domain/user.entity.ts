import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Profile } from '../sub-modules/profile/domain/profile.entity';
import { BaseEntity } from '@/config/database/domain/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
  email: string;

  @OneToMany(() => Profile, (profile) => profile.user)
  profiles: Profile[];
}
