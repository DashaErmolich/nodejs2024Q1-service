import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { UserDataService } from './user-data.service';
import { UpdatePasswordDto } from './dto/update-user-password.dto';
import { getId } from 'src/utils/utils';
import { UserErrorMessage } from './enums/error-message';

@Injectable()
export class UserService {
  constructor(private dataService: UserDataService) {}
  create(dto: CreateUserDto) {
    const newUser: IUser = {
      ...dto,
      id: getId(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 0,
    };
    this.dataService.save(newUser.id, newUser);
    return newUser;
  }

  findAll(): IUser[] {
    return this.dataService.getAll();
  }

  findOne(id: string): IUser {
    const user: IUser | undefined = this.dataService.getOne(id);
    if (user) {
      return user;
    }

    throw new HttpException(UserErrorMessage.NotFound, HttpStatus.NOT_FOUND);
  }

  update(id: string, dto: UpdatePasswordDto) {
    const user = this.findOne(id);
    this.checkPassword(user.password, dto.oldPassword);
    user.password = dto.newPassword;
    this.dataService.save(id, user);
    return user;
  }

  remove(id: string) {
    this.findOne(id);
    this.dataService.remove(id);
  }

  private checkPassword(dbPassword: string, dtoPassword: string) {
    if (dbPassword !== dtoPassword) {
      throw new HttpException(
        UserErrorMessage.WrongOldPassword,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
