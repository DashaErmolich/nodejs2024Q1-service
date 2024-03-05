import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UserDataService } from './user-data.service';
import { UpdatePasswordDto } from './dto/update-user-password.dto';
import { getId } from 'src/utils/utils';

@Injectable()
export class UserService {
  constructor(private dataService: UserDataService) {}
  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: getId(),
      login: createUserDto.login,
      password: createUserDto.password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 0,
    };
    this.dataService.save(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.dataService.getAll();
  }

  findOne(id: string): User {
    const user: User | undefined = this.dataService.getOne(id);
    if (user) {
      return user;
    }

    throw new HttpException(
      `User with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  update(id: string, updateUserDto: UpdatePasswordDto) {
    const user = this.findOne(id);
    this.checkPassword(user.password, updateUserDto.oldPassword);
    user.password = updateUserDto.newPassword;
    this.dataService.save(user);
    return user;
  }

  remove(id: string) {
    this.findOne(id);
    this.dataService.remove(id);
  }

  private checkPassword(dbPassword: string, dtoPassword: string) {
    if (dbPassword !== dtoPassword) {
      throw new HttpException(
        `Wrong old password provided`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
