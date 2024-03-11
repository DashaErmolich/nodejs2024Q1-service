import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { BaseDataService } from 'src/abstract/base-data.service';
import { IUser } from './interfaces/user.interface';
import { UserErrorMessage } from './enums/error-message';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    BaseDataService<IUser>,
    { provide: 'ERROR_MSG', useValue: UserErrorMessage },
  ],
})
export class UserModule {}
