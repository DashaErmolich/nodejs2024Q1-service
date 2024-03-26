import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotAcceptableException,
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
    const user = this.userRepository.create(dto);
    return await this.saveToDataSource(user);
    // return this.getPublicUser(user);
  }

  private async createUser(dto: CreateUserDto) {
    const user = this.userRepository.create(dto);
    await this.saveToDataSource(user);
    return this.getPublicUser(user);
  }

  public async findOne(id: string) {
    return await this.findById(id);
  }

  async updateUserPassword(id: string, dto: UpdatePasswordDto) {
    const user = await this.findById(id);
    this.checkPassword(user.password, dto.oldPassword);
    await this.saveToDataSource({ ...user, password: dto.newPassword });
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

  private getPublicUser(user: User): IPublicUser {
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

  private async saveToDataSource(item: User) {
    try {
      return await this.userRepository.save(item);
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  public async findByLogin(login: string) {
    return await this.userRepository.findOneBy({ login });
  }

  public async updateRefreshToken(id: string, refreshToken: string) {
    const user = await this.findById(id);
    await this.saveToDataSource({ ...user, refreshToken });
  }
}
