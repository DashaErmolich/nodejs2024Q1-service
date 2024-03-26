import { User } from 'src/user/entities/user.entity';

export interface MyRequest extends Request {
  user: User;
}

export interface SessionTokens {
  access_token: string;
  refresh_token: string;
}
