import {
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { IErrorMessage } from 'src/abstract/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Artist } from 'src/artist/entities/artist.entity';
import { ArtistErrorMessage } from 'src/artist/enums/error-message';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('ERROR_MSG') protected ErrorMessage: IErrorMessage,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    private artistService: ArtistService,
  ) {}

  public async create(dto: CreateAlbumDto) {
    const album = this.albumRepository.create(dto);
    const artist = await this.artistService.findById(dto.artistId);
    album.artist = artist || null;
    return await this.saveToDataSource(album);
  }

  public async findOne(id: string) {
    return await this.findById(id);
  }

  async update(id: string, dto: UpdateAlbumDto) {
    const album = await this.findById(id);
    return await this.saveToDataSource({ ...album, ...dto });
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async remove(id: string) {
    await this.findById(id);
    await this.albumRepository.delete(id);
  }

  public async findById(id: string) {
    try {
      if (id) {
        return await this.albumRepository.findOneByOrFail({ id });
      }
    } catch (error) {
      throw new NotFoundException(this.ErrorMessage.NotFound);
    }
  }

  private async saveToDataSource(item: Album) {
    try {
      return await this.albumRepository.save(item);
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }
}
