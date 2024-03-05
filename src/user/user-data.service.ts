import { Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/interfaces/user.interface';
import { getId } from 'src/utils/utils';
import { UpdatePasswordDto } from './dto/update-user-password.dto';

@Injectable()
export class UserDataService extends DataService<
  User,
  CreateUserDto,
  UpdatePasswordDto
> {
  constructor() {
    super();
  }

  public create(dto: CreateUserDto): User {
    const newUser: User = {
      id: getId(),
      login: dto.login,
      password: dto.password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 0,
    };

    this.data.set(newUser.id, newUser);

    return newUser;
  }

  public update(id: string, dto: UpdatePasswordDto): User {
    const updatedUser = this.getOne(id);
    updatedUser.password = dto.newPassword;
    return updatedUser;
  }
}
