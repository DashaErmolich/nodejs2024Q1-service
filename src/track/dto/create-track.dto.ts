import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { ICreateTrackDto } from '../interfaces/create-track-dto';

export class CreateTrackDto implements ICreateTrackDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  albumId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  artistId: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
