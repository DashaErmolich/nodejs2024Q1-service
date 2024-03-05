import { Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { IArtist } from './interfaces/artist.interface';

@Injectable()
export class ArtistDataService extends DataService<IArtist> {
  constructor() {
    super();
  }
}
