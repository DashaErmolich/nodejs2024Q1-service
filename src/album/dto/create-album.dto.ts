import { IsNotEmpty, IsUUID } from 'class-validator';
import { ICreateAlbumDto } from '../interfaces/create-album-dto';

export class CreateAlbumDto implements ICreateAlbumDto {
  @IsNotEmpty()
  @IsUUID('4')
  artistId: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  year: number;
}
