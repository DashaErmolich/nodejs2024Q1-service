import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { ICreateTrackDto } from '../interfaces/create-track-dto';

export class CreateTrackDto implements ICreateTrackDto {
  @IsString()
  @IsUUID('4')
  albumId: string | null;

  @IsString()
  @IsUUID('4')
  artistId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
