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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly dataService: ArtistService) {}

  @Post()
  create(@Body() dto: CreateArtistDto) {
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
    @Body() dto: UpdateArtistDto,
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
