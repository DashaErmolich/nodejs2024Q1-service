import { ICreateUserDto } from './../interfaces/create-user-dto';
export class CreateUserDto implements ICreateUserDto {
  login: string;
  password: string;
}
