import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { BaseDataService } from 'src/abstract/base-data.service';
import { ITrack } from './interfaces/track.interface';
import { TrackErrorMessage } from './enums/error-message';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [TypeOrmModule.forFeature([Track]), AlbumModule, ArtistModule],
  controllers: [TrackController],
  providers: [
    TrackService,
    BaseDataService<ITrack>,
    { provide: 'ERROR_MSG', useValue: TrackErrorMessage },
  ],
  exports: [TrackService],
})
export class TrackModule {}
