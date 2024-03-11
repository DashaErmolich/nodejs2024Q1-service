import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IPublicUser, IUser } from './interfaces/user.interface';
import { UpdatePasswordDto } from './dto/update-user-password.dto';
import { getId, increment } from 'src/utils/utils';
import { UserErrorMessage } from './enums/error-message';
import { BaseService } from 'src/abstract/base.service';
import { BaseDataService } from 'src/abstract/base-data.service';

const DEFAULT_USER_VERSION = 1;

@Injectable()
export class UserService extends BaseService<IUser> {
  constructor(dataService: BaseDataService<IUser>) {
    super(dataService);
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

  findOne(id: string): IUser {
    const user: IUser | undefined = this.dataService.getOne(id);
    if (user) {
      return user;
    }

    throw new HttpException(UserErrorMessage.NotFound, HttpStatus.NOT_FOUND);
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
