import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getId } from 'src/utils/utils';
import { AlbumDataService } from './album-data.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { IAlbum } from './interfaces/album.interface';
import { AlbumErrorMessage } from './enums/error-message';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private dataService: AlbumDataService) {}
  create(dto: CreateAlbumDto) {
    const newTrack: IAlbum = { ...dto, id: getId() };
    this.dataService.save(newTrack.id, newTrack);
    return newTrack;
  }

  findAll(): IAlbum[] {
    return this.dataService.getAll();
  }

  findOne(id: string): IAlbum {
    const artist: IAlbum | undefined = this.dataService.getOne(id);
    if (artist) {
      return artist;
    }

    throw new HttpException(AlbumErrorMessage.NotFound, HttpStatus.NOT_FOUND);
  }

  update(id: string, dto: UpdateAlbumDto) {
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
