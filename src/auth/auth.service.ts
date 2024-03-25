import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async signup(dto: CreateUserDto) {
    const candidate = await this.userService.findByLogin(dto.login);

    if (candidate) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const salt = Number(process.env.CRYPT_SALT);

    const hashPassword = await bcrypt.hash(dto.password, salt);

    const user = await this.userService.create({
      ...dto,
      password: hashPassword,
    });

    return await this.generateAccessToken(user);
  }

  public async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return await this.generateAccessToken(user);
  }

  private async generateAccessToken(user: User) {
    const { id: userId, login } = user;

    return {
      access_token: await this.jwtService.signAsync({ userId, login }),
    };
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.findByLogin(dto.login);
    const isPasswordEquals = await bcrypt.compare(dto.password, user.password);

    if (user && isPasswordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Incorrect login or password' });
  }
}
