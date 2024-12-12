import { BadRequestException, Injectable } from '@nestjs/common';
import { ProfileRepository } from './domain/profile.repository';
import { Profile } from './domain/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { VerifyPinDto } from './dto/verify-pin.dto';

export interface IProfileService {
  findOne(id: string): Promise<Profile>;
  create(dto: CreateProfileDto): Promise<Profile>;
  verifyPin(dto: VerifyPinDto): Promise<boolean>;
}

@Injectable()
export class ProfileService implements IProfileService {
  constructor(private readonly userRepository: ProfileRepository) {}

  async findOne(id: string): Promise<Profile> {
    return this.userRepository.findOne(id);
  }

  async create(dto: CreateProfileDto): Promise<Profile> {
    return this.userRepository.create(dto);
  }

  async verifyPin(dto: VerifyPinDto): Promise<boolean> {
    const profile = await this.userRepository.findOne(dto.id);

    if (!profile.pin) {
      return true;
    }

    if (profile.pin !== dto.pin) {
      throw new BadRequestException('Pin is not correct');
    }

    return true;
  }
}
