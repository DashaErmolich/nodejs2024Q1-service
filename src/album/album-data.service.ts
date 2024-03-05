import { Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { IAlbum } from './interfaces/album.interface';

@Injectable()
export class AlbumDataService extends DataService<IAlbum> {
  constructor() {
    super();
  }
}
