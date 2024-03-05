import { Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/interfaces/user.interface';
import { getId } from 'src/utils/utils';

@Injectable()
export class UserDataService extends DataService<User, CreateUserDto> {
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
}
