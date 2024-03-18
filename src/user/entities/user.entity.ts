import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { getId, increment } from '../../utils/utils';
import { CreateUserDto } from '../dto/create-user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ default: 1 })
  version: number;

  @Column('bigint')
  createdAt: number;

  @Column('bigint')
  updatedAt: number;
}
