import { Injectable } from '@nestjs/common';
import { UserRepository } from './domain/user.repository';
import { User } from './domain/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

export interface IUserService {
  findAll(): Promise<User[]>;
  findOne(id: string): Promise<User>;
  create(dto: CreateUserDto): Promise<User>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);

    return {
      ...user,
      profiles: user.profiles.map((profile) => ({
        ...profile,
        pin: null,
      })),
    };
  }

  async create(dto: CreateUserDto): Promise<User> {
    return this.userRepository.create(dto);
  }
}
