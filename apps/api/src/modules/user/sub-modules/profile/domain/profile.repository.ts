import { PROFILE_REPOSITORY } from '@/config/constants';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { CreateProfileDto } from '../dto/create-profile.dto';

@Injectable()
export class ProfileRepository {
  constructor(
    @Inject(PROFILE_REPOSITORY)
    private repository: Repository<Profile>,
  ) {}

  async findOne(id: string): Promise<Profile> {
    return this.repository.findOneOrFail({ where: { id } });
  }

  async create(dto: CreateProfileDto): Promise<Profile> {
    const profile = this.repository.create(dto);
    await this.repository.save(profile);

    return profile;
  }
}
