import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { BaseDataService } from 'src/abstract/base-data.service';
import { ITrack } from './interfaces/track.interface';
import { TrackErrorMessage } from './enums/error-message';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    BaseDataService<ITrack>,
    { provide: 'ERROR_MSG', useValue: TrackErrorMessage },
  ],
  exports: [TrackService],
})
export class TrackModule {}
