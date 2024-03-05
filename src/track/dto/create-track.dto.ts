import { IsNotEmpty, IsUUID, isUUID } from 'class-validator';
import { ICreateTrackDto } from '../interfaces/create-track-dto';

export class CreateTrackDto implements ICreateTrackDto {
  @IsNotEmpty()
  @IsUUID('4')
  albumId: string | null;

  @IsNotEmpty()
  @IsUUID('4')
  artistId: string | null;

  @IsNotEmpty()
  duration: number;

  @IsNotEmpty()
  name: string;
}
