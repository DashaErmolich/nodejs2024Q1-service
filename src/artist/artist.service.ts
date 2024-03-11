import { Inject, Injectable } from '@nestjs/common';
import { getId } from 'src/utils/utils';
import { CreateArtistDto } from './dto/create-artist.dto';
import { IArtist } from './interfaces/artist.interface';
import { ArtistErrorMessage } from './enums/error-message';
import { BaseService, IErrorMessage } from 'src/abstract/base.service';
import { BaseDataService } from 'src/abstract/base-data.service';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from '../album/album.service';

@Injectable()
export class ArtistService extends BaseService<IArtist> {
  constructor(
    @Inject('ERROR_MSG') protected ErrorMessage: IErrorMessage,
    protected dataService: BaseDataService<IArtist>,
    private trackService: TrackService,
    private albumService: AlbumService,
  ) {
    super(ErrorMessage, dataService);
  }
  create(dto: CreateArtistDto) {
    const newTrack: IArtist = { ...dto, id: getId() };
    this.dataService.save(newTrack.id, newTrack);
    return newTrack;
  }

  protected cleanUpAfterDelete(id: string): void {
    this.trackService.setArtistIdToNull(id);
    this.albumService.setArtistIdToNull(id);
  }
}
