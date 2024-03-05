import { ITrack } from 'src/track/interfaces/track.interface';
import { IUser } from 'src/user/interfaces/user.interface';

export type MyData<T> = Map<string, T>;

type T = IUser | ITrack;

export abstract class DataService<T> {
  protected data: MyData<T>;

  constructor() {
    this.data = new Map();
  }
  public save(id: string, item: T): void {
    this.data.set(id, item);
  }

  public getAll(): T[] {
    return [...this.data.values()];
  }

  public getOne(id: string): T | undefined {
    return this.data.get(id);
  }

  public remove(id: string): boolean {
    return this.data.delete(id);
  }
}
