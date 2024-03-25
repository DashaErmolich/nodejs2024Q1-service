import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Album, {
    nullable: true,
  })
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Artist, { nullable: true })
  @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Track, { nullable: true })
  @JoinTable()
  tracks: Track[];
}
