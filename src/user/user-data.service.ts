import { Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserDataService extends DataService<IUser> {
  constructor() {
    super();
  }
}
