import { Inject, Injectable } from '@nestjs/common';
import { getId } from 'src/utils/utils';
import { CreateAlbumDto } from './dto/create-album.dto';
import { IAlbum } from './interfaces/album.interface';
import { BaseService, IErrorMessage } from 'src/abstract/base.service';
import { BaseDataService } from 'src/abstract/base-data.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService extends BaseService<IAlbum> {
  constructor(
    @Inject('ERROR_MSG') protected ErrorMessage: IErrorMessage,
    protected dataService: BaseDataService<IAlbum>,
    private trackService: TrackService,
  ) {
    super(ErrorMessage, dataService);
  }

  cleanUpAfterDelete(id: string) {
    this.trackService.setAlbumIdToNull(id);
  }

  create(dto: CreateAlbumDto) {
    const newTrack: IAlbum = { ...dto, id: getId() };
    this.dataService.save(newTrack.id, newTrack);
    return newTrack;
  }

  setArtistIdToNull(artistId: string): void {
    const album: IAlbum | undefined = this.findAll().find(
      (v) => v.artistId === artistId,
    );
    if (album) {
      album.artistId = null;
      this.dataService.save(album.id, album);
    }
  }
}
