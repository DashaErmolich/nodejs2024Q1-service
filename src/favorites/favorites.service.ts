import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { FavoritesType } from './enums/favorites-type';
import { FavoritesDataService } from './favorites-data.service';
import { FavoritesResponse } from './interfaces/favorites.interface';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class FavoritesService {
  constructor(
    private dataService: FavoritesDataService,
    private artistService: ArtistService,
    private albumService: AlbumService,
    private trackService: TrackService,
  ) {}

  findAll(): FavoritesResponse {
    const favorites = this.dataService.getAll();
    return {
      albums: this.albumService.findAllByIds(favorites.albums),
      artists: this.artistService.findAllByIds(favorites.artists),
      tracks: this.trackService.findAllByIds(favorites.tracks),
    };
  }

  addOne(id: string, type: FavoritesType): void {
    this.findOne(id, type);
    this.dataService.addOne(id, type);
  }

  findOne(id: string, type: FavoritesType) {
    try {
      switch (type) {
        case FavoritesType.Album:
          return this.albumService.findOne(id);
        case FavoritesType.Artist:
          return this.artistService.findOne(id);
        case FavoritesType.Track:
          return this.trackService.findOne(id);
      }
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  remove(id: string, type: FavoritesType) {
    this.findOne(id, type);
    this.dataService.removeOne(id, type);
  }
}
