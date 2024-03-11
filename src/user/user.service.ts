import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IPublicUser, IUser } from './interfaces/user.interface';
import { UpdatePasswordDto } from './dto/update-user-password.dto';
import { getId, increment } from 'src/utils/utils';
import { UserErrorMessage } from './enums/error-message';
import { BaseService, IErrorMessage } from 'src/abstract/base.service';
import { BaseDataService } from 'src/abstract/base-data.service';

const DEFAULT_USER_VERSION = 1;

@Injectable()
export class UserService extends BaseService<IUser> {
  constructor(
    @Inject('ERROR_MSG') protected ErrorMessage: IErrorMessage,
    protected dataService: BaseDataService<IUser>,
  ) {
    super(ErrorMessage, dataService);
  }
  create(dto: CreateUserDto): IPublicUser {
    const timestamp = Date.now();
    const newUser: IPublicUser = {
      login: dto.login,
      id: getId(),
      createdAt: timestamp,
      updatedAt: timestamp,
      version: DEFAULT_USER_VERSION,
    };
    this.dataService.save(newUser.id, { ...newUser, password: dto.password });
    return newUser;
  }

  updateUser(id: string, dto: UpdatePasswordDto): IPublicUser {
    const user = this.findOne(id);
    this.checkPassword(user.password, dto.oldPassword);
    user.password = dto.newPassword;
    user.version = increment(user.version);
    user.updatedAt = Date.now();
    this.dataService.save(id, user);
    return this.getPublicUser(user);
  }

  private checkPassword(dbPassword: string, dtoPassword: string) {
    if (dbPassword !== dtoPassword) {
      throw new HttpException(
        UserErrorMessage.WrongOldPassword,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected cleanUpAfterDelete(id: string): void {}

  private getPublicUser(user: IUser): IPublicUser {
    const copy = { ...user };
    delete copy.password;
    return copy;
  }
}
