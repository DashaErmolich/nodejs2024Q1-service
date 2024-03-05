import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumDataService } from './album-data.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumDataService],
})
export class AlbumModule {}
