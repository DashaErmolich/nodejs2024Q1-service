import { Module, forwardRef } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { BaseDataService } from 'src/abstract/base-data.service';
import { IAlbum } from './interfaces/album.interface';
import { TrackModule } from 'src/track/track.module';

@Module({
  imports: [forwardRef(() => TrackModule)],
  controllers: [AlbumController],
  providers: [AlbumService, BaseDataService<IAlbum>],
  exports: [AlbumService],
})
export class AlbumModule {}
