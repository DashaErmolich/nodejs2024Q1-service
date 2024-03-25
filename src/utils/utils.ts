import { randomUUID } from 'crypto';

export function getId(): string {
  return randomUUID();
}

export function increment(value: number): number {
  return value + 1;
}

// export async function findByIdOrThrowError<HasId>(
//   id: string,
//   repo: Repository<HasId>,
//   error: string,
// ) {
//   const item = await repo.findOneBy({ id });
//   if (item) {
//     return item;
//   }
//   throw new NotFoundException(error);
// }
