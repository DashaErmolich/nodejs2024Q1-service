import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getId } from 'src/utils/utils';
import { CreateTrackDto } from './dto/create-track.dto';
import { ITrack } from './interfaces/track.interface';
import { TrackErrorMessage } from './enums/error-message';
import { BaseService } from 'src/abstract/base.service';
import { BaseDataService } from 'src/abstract/base-data.service';

@Injectable()
export class TrackService extends BaseService<ITrack> {
  constructor(dataService: BaseDataService<ITrack>) {
    super(dataService);
  }
  create(dto: CreateTrackDto) {
    const newTrack: ITrack = { ...dto, id: getId() };
    this.dataService.save(newTrack.id, newTrack);
    return newTrack;
  }

  findOne(id: string): ITrack {
    const track: ITrack | undefined = this.dataService.getOne(id);
    if (track) {
      return track;
    }

    throw new HttpException(TrackErrorMessage.NotFound, HttpStatus.NOT_FOUND);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected cleanUpAfterDelete(id: string): void {}

  public setAlbumIdToNull(albumId: string): void {
    const track: ITrack | undefined = this.findAll().find(
      (v) => v.albumId === albumId,
    );
    if (track) {
      track.albumId = null;
      this.dataService.save(track.id, track);
    }

    // throw new HttpException(TrackErrorMessage.NotFound, HttpStatus.NOT_FOUND);
  }

  public setArtistIdToNull(artistId: string): void {
    const track: ITrack | undefined = this.findAll().find(
      (v) => v.artistId === artistId,
    );
    if (track) {
      track.artistId = null;
      this.dataService.save(track.id, track);
    }

    // throw new HttpException(TrackErrorMessage.NotFound, HttpStatus.NOT_FOUND);
  }
}
