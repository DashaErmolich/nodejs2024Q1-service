import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  ParseUUIDPipe,
  UsePipes,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrack } from './interfaces/track.interface';

@Controller('track')
export class TrackController {
  constructor(private readonly dataService: TrackService) {}

  @Post()
  create(@Body() dto: CreateTrackDto): ITrack {
    return this.dataService.create(dto);
  }

  @Get()
  findAll() {
    return this.dataService.findAll();
  }

  @Get(':id')
  @UsePipes(ParseUUIDPipe)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.dataService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTrackDto,
  ) {
    return this.dataService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UsePipes(ParseUUIDPipe)
  remove(@Param('id') id: string) {
    return this.dataService.remove(id);
  }
}
