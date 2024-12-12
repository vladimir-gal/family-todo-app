import { USER_REPOSITORY } from '@/config/constants';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(USER_REPOSITORY)
    private repository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.repository.findOneOrFail({
      where: { id },
      relations: ['profiles'],
    });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.repository.create(dto);
    await this.repository.save(user);

    return user;
  }
}
