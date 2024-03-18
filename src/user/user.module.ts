import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { BaseDataService } from 'src/abstract/base-data.service';
import { IUser } from './interfaces/user.interface';
import { UserErrorMessage } from './enums/error-message';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    BaseDataService<IUser>,
    { provide: 'ERROR_MSG', useValue: UserErrorMessage },
  ],
})
export class UserModule {}
