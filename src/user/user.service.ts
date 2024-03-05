import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { UserDataService } from './user-data.service';

@Injectable()
export class UserService {
  constructor(private dataService: UserDataService) {}
  create(createUserDto: CreateUserDto) {
    return this.dataService.create(createUserDto);
  }

  findAll(): User[] {
    return this.dataService.getAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
