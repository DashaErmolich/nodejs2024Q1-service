import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistDataService } from './artist-data.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistDataService],
})
export class ArtistModule {}
