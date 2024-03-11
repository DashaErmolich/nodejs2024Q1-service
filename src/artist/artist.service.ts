import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getId } from 'src/utils/utils';
import { CreateArtistDto } from './dto/create-artist.dto';
import { IArtist } from './interfaces/artist.interface';
import { ArtistErrorMessage } from './enums/error-message';
import { BaseService } from 'src/abstract/base.service';
import { BaseDataService } from 'src/abstract/base-data.service';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from '../album/album.service';

@Injectable()
export class ArtistService extends BaseService<IArtist> {
  constructor(
    dataService: BaseDataService<IArtist>,
    private trackService: TrackService,
    private albumService: AlbumService,
  ) {
    super(dataService);
  }
  create(dto: CreateArtistDto) {
    const newTrack: IArtist = { ...dto, id: getId() };
    this.dataService.save(newTrack.id, newTrack);
    return newTrack;
  }

  findOne(id: string): IArtist {
    const artist: IArtist | undefined = this.dataService.getOne(id);
    if (artist) {
      return artist;
    }

    throw new HttpException(ArtistErrorMessage.NotFound, HttpStatus.NOT_FOUND);
  }

  protected cleanUpAfterDelete(id: string): void {
    this.trackService.setArtistIdToNull(id);
    this.albumService.setArtistIdToNull(id);
  }
}
