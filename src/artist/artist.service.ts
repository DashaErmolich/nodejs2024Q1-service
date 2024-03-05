import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getId } from 'src/utils/utils';
import { ArtistDataService } from './artist-data.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { IArtist } from './interfaces/artist.interface';
import { ArtistErrorMessage } from './enums/error-message';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private dataService: ArtistDataService) {}
  create(dto: CreateArtistDto) {
    const newTrack: IArtist = { ...dto, id: getId() };
    this.dataService.save(newTrack.id, newTrack);
    return newTrack;
  }

  findAll(): IArtist[] {
    return this.dataService.getAll();
  }

  findOne(id: string): IArtist {
    const artist: IArtist | undefined = this.dataService.getOne(id);
    if (artist) {
      return artist;
    }

    throw new HttpException(ArtistErrorMessage.NotFound, HttpStatus.NOT_FOUND);
  }

  update(id: string, dto: UpdateArtistDto) {
    const artist = this.findOne(id);
    for (const key in dto) {
      artist[key] = dto[key];
    }
    this.dataService.save(id, artist);
    return artist;
  }

  remove(id: string) {
    this.findOne(id);
    this.dataService.remove(id);
  }
}
