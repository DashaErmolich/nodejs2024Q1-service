import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { IErrorMessage } from 'src/abstract/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('ERROR_MSG') protected ErrorMessage: IErrorMessage,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}
  public async create(dto: CreateArtistDto) {
    const artist = this.artistRepository.create(dto);
    return await this.saveToDataSource(artist);
  }

  public async findOne(id: string) {
    return await this.findById(id);
  }

  async update(id: string, dto: UpdateArtistDto) {
    const artist = await this.findById(id);
    return await this.saveToDataSource({ ...artist, ...dto });
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async remove(id: string) {
    await this.findById(id);
    await this.artistRepository.delete(id);
  }

  public async findById(id: string) {
    try {
      if (id) {
        return await this.artistRepository.findOneByOrFail({ id });
      }
    } catch (error) {
      throw new NotFoundException(this.ErrorMessage.NotFound);
    }
  }

  private async saveToDataSource(item: Artist) {
    try {
      return await this.artistRepository.save(item);
    } catch (error) {
      // throw new NotAcceptableException(error.message);
    }
  }
}
