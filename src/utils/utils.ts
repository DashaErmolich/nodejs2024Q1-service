import { randomUUID } from 'crypto';

export function getId(): string {
  return randomUUID();
}
