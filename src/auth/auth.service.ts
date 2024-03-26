import {
  BadRequestException,
  ForbiddenException,
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
import { jwtRefreshTokenOptions } from 'src/config/jwt';
import { MyRequest, SessionTokens } from './interfaces/my-request.interface';
import { AuthDto } from './dto/auth.dto';
import { Auth } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async signup(dto: AuthDto): Promise<SessionTokens> {
    const userDto: CreateUserDto = { ...dto, login: dto.username };
    const candidate = await this.userService.findByLogin(userDto.login);

    if (candidate) {
      throw new BadRequestException('User already exists');
    }

    const salt = Number(process.env.CRYPT_SALT);

    const hashPassword = await bcrypt.hash(dto.password, salt);

    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });

    const tokens = await this.getTokens(user);

    await this.userService.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  public async login(dto: AuthDto) {
    const userDto: CreateUserDto = { ...dto, login: dto.username };
    const user = await this.validateUser(userDto);
    const tokens = await this.getTokens(user);

    await this.userService.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  // public async signup(dto: CreateUserDto): Promise<SessionTokens> {
  //   const candidate = await this.userService.findByLogin(dto.login);

  //   if (candidate) {
  //     throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
  //   }

  //   const salt = Number(process.env.CRYPT_SALT);

  //   const hashPassword = await bcrypt.hash(dto.password, salt);

  //   const user = await this.userService.create({
  //     ...dto,
  //     password: hashPassword,
  //   });

  //   const refreshToken = await this.generateRefreshToken(user);

  //   await this.userService.updateRefreshToken(user.id, refreshToken);

  //   return {
  //     access_token: await this.generateAccessToken(user),
  //     refresh_token: refreshToken,
  //   };
  // }

  private async getTokens(user: User): Promise<SessionTokens> {
    return {
      access_token: await this.generateAccessToken(user),
      refresh_token: await this.generateRefreshToken(user),
    };
  }

  // public async login(dto: CreateUserDto) {
  //   const user = await this.validateUser(dto);
  //   return await this.generateAccessToken(user);
  // }

  private async generateAccessToken(user: User) {
    const { id: userId, login } = user;

    return await this.jwtService.signAsync({ userId, login });
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.findByLogin(dto.login);
    const isPasswordEquals = await bcrypt.compare(dto.password, user.password);

    if (user && isPasswordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Incorrect login or password' });
  }

  async generateRefreshToken(user: User) {
    const { id: userId, login } = user;

    return await this.jwtService.signAsync(
      { userId, login },
      jwtRefreshTokenOptions,
    );
  }

  public async refresh(userId: string, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    // const refreshTokenMatches = await bcrypt.compare(
    //   user.refreshToken,
    //   refreshToken,
    // );
    const refreshTokenMatches = user.refreshToken === refreshToken;
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user);
    await this.userService.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  // public async refresh(req: MyRequest) {
  //   const { user } = req;
  //   const oldRefreshToken = (await this.userService.findOne(user.id))
  //     .refreshToken;
  //   const refreshToken = req.headers.get('refresh_token');

  //   const isMatch = bcrypt.compare(refreshToken, oldRefreshToken);

  //   if (!isMatch) {
  //     throw new UnauthorizedException();
  //   }

  //   await this.jwtService.verifyAsync(
  //     refreshToken,
  //     jwtModuleRefreshTokenOptions,
  //   );

  //   // const decodedRefreshToken = await this.jwtService.decode(oldRefreshToken);

  //   const newAccessToken = await this.generateAccessToken(user);
  // }
}
