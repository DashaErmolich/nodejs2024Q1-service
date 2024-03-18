import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';

export function getId(): string {
  return randomUUID();
}

export function increment(value: number): number {
  return value + 1;
}
