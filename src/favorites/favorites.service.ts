import {
  Injectable,
  NotAcceptableException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesType } from './enums/favorites-type';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { Repository } from 'typeorm';
import { Favorites } from './entities/favorites.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { HasId } from 'src/abstract/base.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private favoritesRepository: Repository<Favorites>,
    private albumService: AlbumService,
    private artistService: ArtistService,
    private trackService: TrackService,
  ) {}

  async findAll() {
    const favs = await this.favoritesRepository.find({
      relations: { albums: true, artists: true, tracks: true },
    });

    if (!favs.length) {
      this.createFav();
    }

    //TODO Find by user ID
    return favs[0];
  }

  private async createFav() {
    const fav = this.favoritesRepository.create();
    fav.albums = [];
    fav.artists = [];
    fav.tracks = [];

    return await this.saveToDataSource(fav);
  }

  async addOne(id: string, type: FavoritesType) {
    const fav = await this.findAll();
    const item = await this.findOne(id, type);

    switch (type) {
      case FavoritesType.Album:
        fav.albums.push(item as Album);
        break;
      case FavoritesType.Artist:
        fav.artists.push(item as Artist);
        break;
      case FavoritesType.Track:
        fav.tracks.push(item as Track);
        break;
    }

    await this.saveToDataSource(fav);
  }

  private async findOne(id: string, type: FavoritesType) {
    try {
      switch (type) {
        case FavoritesType.Album:
          return await this.albumService.findOne(id);
        case FavoritesType.Artist:
          return await this.artistService.findOne(id);
        case FavoritesType.Track:
          return await this.trackService.findOne(id);
      }
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  private removeOneByType(id: string, type: FavoritesType, favs: Favorites) {
    switch (type) {
      case FavoritesType.Album: {
        this.removeOne(favs.albums, id);
        break;
      }
      case FavoritesType.Artist: {
        this.removeOne(favs.artists, id);
        break;
      }
      case FavoritesType.Track: {
        this.removeOne(favs.tracks, id);
        break;
      }
    }
  }

  private removeOne<T extends HasId>(arr: T[], itemId: string) {
    const index = arr.findIndex((v) => v.id === itemId);
    if (index !== -1) {
      arr.splice(index, 1);
    }
  }

  async remove(id: string, type: FavoritesType) {
    const fav = await this.findAll();
    await this.findOne(id, type);
    this.removeOneByType(id, type, fav);
    await this.saveToDataSource(fav);
  }

  private async saveToDataSource(item: Favorites) {
    try {
      return await this.favoritesRepository.save(item);
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }
}
