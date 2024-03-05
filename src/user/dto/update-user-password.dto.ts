import { IsNotEmpty } from 'class-validator';
import { IUpdatePasswordDto } from '../interfaces/update-password-dto';

export class UpdatePasswordDto implements IUpdatePasswordDto {
  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  oldPassword: string;
}
