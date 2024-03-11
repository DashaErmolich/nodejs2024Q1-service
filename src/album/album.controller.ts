import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpCode,
  ParseUUIDPipe,
  UsePipes,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly dataService: AlbumService) {}

  @Post()
  create(@Body() dto: CreateAlbumDto) {
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
    @Body() dto: UpdateAlbumDto,
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
