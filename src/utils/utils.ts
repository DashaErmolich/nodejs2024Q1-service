import { randomUUID } from 'crypto';

export function getId(): string {
  return randomUUID();
}

export function increment(value: number): number {
  return value + 1;
}
