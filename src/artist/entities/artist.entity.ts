import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Track, (track) => track.artist)
  @JoinColumn()
  tracks: Track[];

  @OneToMany(() => Album, (album) => album.artist)
  @JoinColumn()
  albums: Album[];
}
