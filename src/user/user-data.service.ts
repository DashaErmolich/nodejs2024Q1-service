import { Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class UserDataService extends DataService<User> {
  constructor() {
    super();
  }

  public save(user: User): void {
    this.data.set(user.id, user);
  }
}
