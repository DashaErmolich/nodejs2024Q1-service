import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { ICreateTrackDto } from '../interfaces/create-track-dto';
import { Track } from '../entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { getId } from 'src/utils/utils';

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
