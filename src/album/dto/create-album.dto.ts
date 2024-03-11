import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { ICreateAlbumDto } from '../interfaces/create-album-dto';

export class CreateAlbumDto implements ICreateAlbumDto {
  @IsString()
  @IsUUID('4')
  artistId: string | null;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;
}
