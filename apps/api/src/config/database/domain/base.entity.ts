import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
}
