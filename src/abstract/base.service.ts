import { BaseDataService } from './base-data.service';

interface HasId {
  id: string;
}

export abstract class BaseService<T extends HasId> {
  protected dataService: BaseDataService<T>;

  constructor(dataService: BaseDataService<T>) {
    this.dataService = dataService;
  }
  public abstract create(dto: Partial<T>): Partial<T>;

  public abstract findOne(id: string): T;

  protected abstract cleanUpAfterDelete(id: string): void;

  public findAll(): T[] {
    return this.dataService.getAll();
  }

  public update(id: string, dto: Partial<T>): T {
    const item = this.findOne(id);
    for (const key in dto) {
      item[key] = dto[key];
    }
    this.dataService.save(id, item);
    return item;
  }

  public remove(id: string): void {
    this.findOne(id);
    this.dataService.remove(id);
    this.cleanUpAfterDelete(id);
  }

  public findAllByIds(ids: string[]): T[] {
    return this.dataService.getAll().reduce((acc, cur) => {
      if (ids.includes(cur.id)) {
        return [...acc, { ...cur }];
      }
      return [...acc];
    }, []);
  }

  // public findOne(id: string, errorMessage: string): T {
  //   const item: T | undefined = this.dataService.getOne(id);
  //   if (item) {
  //     return item;
  //   }

  //   throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
  // }
}
