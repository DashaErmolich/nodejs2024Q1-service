import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getId } from 'src/utils/utils';
import { CreateAlbumDto } from './dto/create-album.dto';
import { IAlbum } from './interfaces/album.interface';
import { AlbumErrorMessage } from './enums/error-message';
import { BaseService } from 'src/abstract/base.service';
import { BaseDataService } from 'src/abstract/base-data.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService extends BaseService<IAlbum> {
  constructor(
    dataService: BaseDataService<IAlbum>,
    private trackService: TrackService,
  ) {
    super(dataService);
  }

  cleanUpAfterDelete(id: string) {
    this.trackService.setAlbumIdToNull(id);
  }

  create(dto: CreateAlbumDto) {
    const newTrack: IAlbum = { ...dto, id: getId() };
    this.dataService.save(newTrack.id, newTrack);
    return newTrack;
  }

  findOne(id: string): IAlbum {
    const artist: IAlbum | undefined = this.dataService.getOne(id);
    if (artist) {
      return artist;
    }

    throw new HttpException(AlbumErrorMessage.NotFound, HttpStatus.NOT_FOUND);
  }

  setArtistIdToNull(artistId: string): void {
    const album: IAlbum | undefined = this.findAll().find(
      (v) => v.artistId === artistId,
    );
    if (album) {
      album.artistId = null;
      this.dataService.save(album.id, album);
    }

    // throw new HttpException(AlbumErrorMessage.NotFound, HttpStatus.NOT_FOUND);
  }
}
