import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDataService } from './user-data.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserDataService],
})
export class UserModule {}
