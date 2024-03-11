import { Injectable } from '@nestjs/common';
import { FavoritesType } from './enums/favorites-type';
import { Favorites } from './interfaces/favorites.interface';

@Injectable()
export class FavoritesDataService {
  private artists: string[];
  private albums: string[];
  private tracks: string[];

  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }

  public getAll(): Favorites {
    return {
      artists: this.artists,
      albums: this.albums,
      tracks: this.tracks,
    };
  }

  public addOne(id: string, type: FavoritesType) {
    switch (type) {
      case FavoritesType.Album:
        this.add(id, this.albums);
        break;
      case FavoritesType.Artist:
        this.add(id, this.artists);
        break;
      case FavoritesType.Track:
        this.add(id, this.tracks);
        break;
    }
  }

  public removeOne(id: string, type: FavoritesType) {
    switch (type) {
      case FavoritesType.Album:
        this.remove(id, this.albums);
        break;
      case FavoritesType.Artist:
        this.remove(id, this.artists);
        break;
      case FavoritesType.Track:
        this.remove(id, this.tracks);
        break;
    }
  }

  private add(id: string, arr: string[]) {
    arr.push(id);
  }

  private remove(id: string, arr: string[]) {
    const itemIndex = arr.findIndex((v) => v === id);
    if (itemIndex !== -1) {
      arr.splice(itemIndex, 1);
    }
  }
}
