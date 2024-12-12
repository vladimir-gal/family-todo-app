import { USER_SERVICE } from '@/config/constants';
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { IUserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,
  ) {}

  @Get('/')
  async findOne(@Query('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post('/create')
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
