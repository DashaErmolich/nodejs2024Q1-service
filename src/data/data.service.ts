export type MyData<T> = Map<string, T>;

export abstract class DataService<T> {
  protected data: MyData<T>;

  constructor() {
    this.data = new Map();
  }
  public abstract save(data: T): void;

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
