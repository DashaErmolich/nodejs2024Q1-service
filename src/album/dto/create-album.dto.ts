import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { ICreateAlbumDto } from '../interfaces/create-album-dto';

export class CreateAlbumDto implements ICreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  artistId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;
}
