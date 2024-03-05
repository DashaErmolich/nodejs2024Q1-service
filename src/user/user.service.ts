import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UserDataService } from './user-data.service';
import { UpdatePasswordDto } from './dto/update-user-password.dto';

@Injectable()
export class UserService {
  constructor(private dataService: UserDataService) {}
  create(createUserDto: CreateUserDto) {
    return this.dataService.create(createUserDto);
  }

  findAll(): User[] {
    return this.dataService.getAll();
  }

  findOne(id: string) {
    return this.dataService.getOne(id);
  }

  update(id: string, updateUserDto: UpdatePasswordDto) {
    return this.dataService.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.dataService.remove(id);
  }
}
