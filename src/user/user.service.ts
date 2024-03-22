import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IPublicUser, IUser } from './interfaces/user.interface';
import { UpdatePasswordDto } from './dto/update-user-password.dto';
import { getId, increment } from 'src/utils/utils';
import { UserErrorMessage } from './enums/error-message';
import { IErrorMessage } from 'src/abstract/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

const DEFAULT_USER_VERSION = 1;

@Injectable()
export class UserService {
  constructor(
    @Inject('ERROR_MSG') protected ErrorMessage: IErrorMessage,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  public async create(dto: CreateUserDto) {
    const timestamp = Date.now();
    const newUser: IPublicUser = {
      login: dto.login,
      id: getId(),
      createdAt: timestamp,
      updatedAt: timestamp,
      version: DEFAULT_USER_VERSION,
    };
    await this.userRepository.save({ ...newUser, password: dto.password });
    return newUser;
  }

  public async findOne(id: string) {
    const user = await this.findById(id);
    return this.getPublicUser(user);
  }

  async updateUser(id: string, dto: UpdatePasswordDto) {
    const user = await this.findById(id);
    this.checkPassword(user.password, dto.oldPassword);
    user.password = dto.newPassword;
    user.version = increment(user.version);
    user.updatedAt = Date.now();
    await this.userRepository.update(id, {
      password: dto.newPassword,
    });
    return this.getPublicUser(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async remove(id: string) {
    await this.findById(id);
    await this.userRepository.delete(id);
  }

  private checkPassword(dbPassword: string, dtoPassword: string) {
    if (dbPassword !== dtoPassword) {
      throw new HttpException(
        UserErrorMessage.WrongOldPassword,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  private getPublicUser(user: IUser): IPublicUser {
    const copy = { ...user };
    delete copy.password;
    return {
      ...copy,
      createdAt: Number(copy.createdAt),
      updatedAt: Number(copy.updatedAt),
    };
  }

  private async findById(id: string) {
    try {
      return await this.userRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(this.ErrorMessage.NotFound);
    }
  }
}
