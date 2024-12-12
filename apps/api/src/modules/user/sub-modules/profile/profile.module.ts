import {
  DATA_SOURCE,
  PROFILE_REPOSITORY,
  PROFILE_SERVICE,
} from '@/config/constants';
import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Profile } from './domain/profile.entity';
import { ProfileRepository } from './domain/profile.repository';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [
    {
      provide: PROFILE_REPOSITORY,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Profile),
      inject: [DATA_SOURCE],
    },
    ProfileRepository,
    {
      provide: PROFILE_SERVICE,
      useClass: ProfileService,
    },
  ],
  exports: [PROFILE_SERVICE],
})
export class ProfileModule {}
