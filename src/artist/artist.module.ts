import { Module, forwardRef } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { IArtist } from './interfaces/artist.interface';
import { BaseDataService } from 'src/abstract/base-data.service';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistErrorMessage } from './enums/error-message';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';

@Module({
  controllers: [ArtistController],
  imports: [
    TypeOrmModule.forFeature([Artist]),
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
  ],
  providers: [
    ArtistService,
    BaseDataService<IArtist>,
    { provide: 'ERROR_MSG', useValue: ArtistErrorMessage },
  ],
  exports: [ArtistService, TypeOrmModule],
})
export class ArtistModule {}
