import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

// export const configService = {
//   type: 'postgres',
//   host: process.env.POSTGRES_HOST,
//   port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
//   username: process.env.POSTGRES_USER_NAME as string,
//   password: process.env.POSTGRES_PASSWORD as string,
//   database: process.env.POSTGRES_DB as string,
//   entities: ['dist/**/entities/*.entity.js'],
//   migrations: ['dist/**/migration/*.js'],
//   synchronize: false,
//   migrationsRun: true,
// } as DataSourceOptions;

export const dbdatasource: DataSourceOptions = {
  // TypeORM PostgreSQL DB Drivers
  type: 'postgres',
  host: `${process.env.POSTGRES_HOST}`,
  port: Number(process.env.POSTGRES_PORT),
  username: `${process.env.POSTGRES_USER_NAME}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
  // Database name
  database: `${process.env.POSTGRES_DB}`,
  // Synchronize database schema with entities
  synchronize: false,
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'hl_migrations',
  migrationsRun: true,
};

const dataSource = new DataSource(dbdatasource);
export default dataSource;
