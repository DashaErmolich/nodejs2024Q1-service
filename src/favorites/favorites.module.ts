import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesDataService } from './favorites-data.service';
import { TrackModule } from 'src/track/track.module';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './entities/favorites.entity';

@Module({
  controllers: [FavoritesController],
  imports: [
    TrackModule,
    ArtistModule,
    AlbumModule,
    TypeOrmModule.forFeature([Favorites]),
  ],
  providers: [FavoritesService, FavoritesDataService],
})
export class FavoritesModule {}
