export type MyData<T> = Map<string, T>;

export abstract class DataService<T, CreateDto, UpdateDto> {
  protected data: MyData<T>;

  constructor() {
    this.data = new Map();
  }
  public abstract create(dto: CreateDto): T;

  public getAll(): T[] {
    return [...this.data.values()];
  }

  public getOne(id: string): T {
    return this.data.get(id);
  }

  public abstract update(id: string, dto: UpdateDto): T;

  public remove(id: string): boolean {
    return this.data.delete(id);
  }
}
