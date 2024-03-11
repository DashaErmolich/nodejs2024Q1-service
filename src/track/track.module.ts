import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { BaseDataService } from 'src/abstract/base-data.service';
import { ITrack } from './interfaces/track.interface';

@Module({
  controllers: [TrackController],
  providers: [TrackService, BaseDataService<ITrack>],
  exports: [TrackService],
})
export class TrackModule {}
