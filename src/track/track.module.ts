import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackDataService } from './track-data.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackDataService],
})
export class TrackModule {}
