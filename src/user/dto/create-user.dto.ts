import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateUserDto } from './../interfaces/create-user-dto';
export class CreateUserDto implements ICreateUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
