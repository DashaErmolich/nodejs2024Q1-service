import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getId } from 'src/utils/utils';
import { TrackDataService } from './track-data.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { ITrack } from './interfaces/track.interface';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackErrorMessage } from './enums/error-message';

@Injectable()
export class TrackService {
  constructor(private dataService: TrackDataService) {}
  create(dto: CreateTrackDto) {
    const newTrack: ITrack = { ...dto, id: getId() };
    this.dataService.save(newTrack.id, newTrack);
    return newTrack;
  }

  findAll(): ITrack[] {
    return this.dataService.getAll();
  }

  findOne(id: string): ITrack {
    const track: ITrack | undefined = this.dataService.getOne(id);
    if (track) {
      return track;
    }

    throw new HttpException(TrackErrorMessage.NotFound, HttpStatus.NOT_FOUND);
  }

  update(id: string, dto: UpdateTrackDto) {
    const track = this.findOne(id);
    for (const key in dto) {
      track[key] = dto[key];
    }
    this.dataService.save(id, track);
    return track;
  }

  remove(id: string) {
    this.findOne(id);
    this.dataService.remove(id);
  }
}
