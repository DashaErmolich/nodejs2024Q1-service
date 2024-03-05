import { Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { ITrack } from './interfaces/track.interface';

@Injectable()
export class TrackDataService extends DataService<ITrack> {
  constructor() {
    super();
  }
}
