import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  UsePipes,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesType } from './enums/favorites-type';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly dataService: FavoritesService) {}

  @Get()
  findAll() {
    return this.dataService.findAll();
  }

  @Post(`${FavoritesType.Track}/:id`)
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.dataService.addOne(id, FavoritesType.Track);
  }

  @Post(`${FavoritesType.Album}/:id`)
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.dataService.addOne(id, FavoritesType.Album);
  }

  @Post(`${FavoritesType.Artist}/:id`)
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.dataService.addOne(id, FavoritesType.Artist);
  }

  @Delete(`${FavoritesType.Track}/:id`)
  @UsePipes(ParseUUIDPipe)
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    return this.dataService.remove(id, FavoritesType.Track);
  }

  @Delete(`${FavoritesType.Album}/:id`)
  @UsePipes(ParseUUIDPipe)
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    return this.dataService.remove(id, FavoritesType.Album);
  }

  @Delete(`${FavoritesType.Artist}/:id`)
  @UsePipes(ParseUUIDPipe)
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    return this.dataService.remove(id, FavoritesType.Artist);
  }
}
