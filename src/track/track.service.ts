import {
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { IErrorMessage } from 'src/abstract/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';
import { UpdateTrackDto } from './dto/update-track.dto';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class TrackService {
  constructor(
    @Inject('ERROR_MSG') protected ErrorMessage: IErrorMessage,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}

  public async create(dto: CreateTrackDto) {
    const track = this.trackRepository.create(dto);
    const album = await this.albumService.findById(dto.albumId);
    const artist = await this.artistService.findById(dto.artistId);

    track.album = album || null;
    track.artist = artist || null;

    return await this.saveToDataSource(track);
  }

  public async findOne(id: string) {
    return await this.findById(id);
  }

  async update(id: string, dto: UpdateTrackDto) {
    const track = await this.findById(id);
    return await this.saveToDataSource({ ...track, ...dto });
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async remove(id: string) {
    await this.findById(id);
    await this.trackRepository.delete(id);
  }

  public async findById(id: string) {
    try {
      return await this.trackRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(this.ErrorMessage.NotFound);
    }
  }

  private async saveToDataSource(item: Track) {
    try {
      return await this.trackRepository.save(item);
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }
}
