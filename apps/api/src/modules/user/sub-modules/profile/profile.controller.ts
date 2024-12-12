import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { IProfileService } from './profile.service';
import { PROFILE_SERVICE } from '@/config/constants';
import { CreateProfileDto } from './dto/create-profile.dto';
import { VerifyPinDto } from './dto/verify-pin.dto';
import { AuthGuard } from '@/modules/auth/auth.guard';

@Controller('profiles')
// @UseGuards(AuthGuard)
export class ProfileController {
  constructor(
    @Inject(PROFILE_SERVICE)
    private readonly profileService: IProfileService,
  ) {}

  @Post('/create')
  async create(@Body() dto: CreateProfileDto) {
    return this.profileService.create(dto);
  }

  @Post('/verify-pin')
  async verifyPin(@Body() dto: VerifyPinDto) {
    return this.profileService.verifyPin(dto);
  }
}
