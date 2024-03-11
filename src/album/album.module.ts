import { Module, forwardRef } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { BaseDataService } from 'src/abstract/base-data.service';
import { IAlbum } from './interfaces/album.interface';
import { TrackModule } from 'src/track/track.module';
import { AlbumErrorMessage } from './enums/error-message';

@Module({
  imports: [forwardRef(() => TrackModule)],
  controllers: [AlbumController],
  providers: [
    AlbumService,
    BaseDataService<IAlbum>,
    { provide: 'ERROR_MSG', useValue: AlbumErrorMessage },
  ],
  exports: [AlbumService],
})
export class AlbumModule {}
