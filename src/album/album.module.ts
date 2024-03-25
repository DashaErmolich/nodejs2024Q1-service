import { Module, forwardRef } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { BaseDataService } from 'src/abstract/base-data.service';
import { IAlbum } from './interfaces/album.interface';
import { AlbumErrorMessage } from './enums/error-message';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), forwardRef(() => ArtistModule)],
  controllers: [AlbumController],
  providers: [
    AlbumService,
    BaseDataService<IAlbum>,
    { provide: 'ERROR_MSG', useValue: AlbumErrorMessage },
  ],
  exports: [AlbumService],
})
export class AlbumModule {}
