import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { BaseDataService } from 'src/abstract/base-data.service';
import { IUser } from './interfaces/user.interface';
import { UserErrorMessage } from './enums/error-message';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    BaseDataService<IUser>,
    { provide: 'ERROR_MSG', useValue: UserErrorMessage },
    { provide: APP_GUARD, useClass: AccessTokenGuard },
  ],
  exports: [UserService],
})
export class UserModule {}
