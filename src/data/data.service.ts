export type MyData<T> = Map<string, T>;

export abstract class DataService<T, D> {
  protected data: MyData<T>;

  constructor() {
    this.data = new Map();
  }
  public abstract create(dto: D): T;

  public getAll(): T[] {
    return [...this.data.values()];
  }
}
