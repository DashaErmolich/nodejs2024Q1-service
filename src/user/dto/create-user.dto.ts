import { IsNotEmpty } from 'class-validator';
import { ICreateUserDto } from './../interfaces/create-user-dto';
export class CreateUserDto implements ICreateUserDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
