import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesDataService } from './favorites-data.service';
import { TrackModule } from 'src/track/track.module';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';

@Module({
  controllers: [FavoritesController],
  imports: [TrackModule, ArtistModule, AlbumModule],
  providers: [FavoritesService, FavoritesDataService],
})
export class FavoritesModule {}
