import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { BaseDataService } from 'src/abstract/base-data.service';
import { IUser } from './interfaces/user.interface';

@Module({
  controllers: [UserController],
  providers: [UserService, BaseDataService<IUser>],
})
export class UserModule {}
