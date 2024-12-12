import { DATA_SOURCE, USER_REPOSITORY, USER_SERVICE } from '@/config/constants';
import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './domain/user.entity';
import { UserRepository } from './domain/user.repository';
import { UserService } from './user.service';
import { ProfileModule } from './sub-modules/profile/profile.module';
import { UserController } from './user.controller';

@Module({
  imports: [ProfileModule],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: [DATA_SOURCE],
    },
    UserRepository,
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
  ],
  exports: [USER_SERVICE],
})
export class UserModule {}
