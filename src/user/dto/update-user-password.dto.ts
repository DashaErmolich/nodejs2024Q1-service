import { IUpdatePasswordDto } from '../interfaces/update-password-dto';

export class UpdatePasswordDto implements IUpdatePasswordDto {
  newPassword: string;
  oldPassword: string;
}
