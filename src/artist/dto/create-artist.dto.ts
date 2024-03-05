import { IsNotEmpty } from 'class-validator';
import { ICreateArtistDto } from '../interfaces/create-artist-dto';

export class CreateArtistDto implements ICreateArtistDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  grammy: boolean;
}
