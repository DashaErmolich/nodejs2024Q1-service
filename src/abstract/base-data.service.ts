import { Injectable } from '@nestjs/common';

export type MyData<T> = Map<string, T>;

@Injectable()
export class BaseDataService<T> {
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
