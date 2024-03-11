import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { getId } from 'src/utils/utils';
import { CreateTrackDto } from './dto/create-track.dto';
import { ITrack } from './interfaces/track.interface';
import { TrackErrorMessage } from './enums/error-message';
import { BaseService, IErrorMessage } from 'src/abstract/base.service';
import { BaseDataService } from 'src/abstract/base-data.service';

@Injectable()
export class TrackService extends BaseService<ITrack> {
  constructor(
    @Inject('ERROR_MSG') protected ErrorMessage: IErrorMessage,
    protected dataService: BaseDataService<ITrack>,
  ) {
    super(ErrorMessage, dataService);
  }
  create(dto: CreateTrackDto) {
    const newTrack: ITrack = { ...dto, id: getId() };
    this.dataService.save(newTrack.id, newTrack);
    return newTrack;
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
