import { Controller, Post, Body, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Public } from './decorators/public.decorator';
import { MyRequest } from './interfaces/my-request.interface';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Public()
  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refresh(@Req() req: MyRequest) {
    const userId = req.user.id;
    const refreshToken = req.user.refreshToken;
    return this.authService.refresh(userId, refreshToken);
  }

  // @Public()
  // @Post('signup')
  // async signup(@Res() res: Response, @Body() dto: CreateUserDto) {
  //   const data = await this.authService.signup(dto);
  //   res.headers.set('access_token', data.access_token);
  //   res.headers.set('refresh_token', data.refresh_token);
  //   // return this.authService.signup(dto);
  // }

  // @Public()
  // @Post('login')
  // async login(@Res() res: Response, @Body() dto: CreateUserDto) {
  //   const accessToken = (await this.authService.login(dto)).access_token;
  //   res.headers.set('access_token', accessToken);
  //   // return this.authService.login(dto);
  // }

  // @Public()
  // @Post('refresh')
  // refresh(@Req() req: MyRequest, @Res() res: Response) {
  //   return this.authService.refresh(req);
  // }
}
