import { DataSource } from 'typeorm';
import { configDotenv } from 'dotenv';

configDotenv();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || '192.168.1.38',
  port: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'mysql',
  database: process.env.POSTGRES_DATABASE || 'postgres',
  entities: ['dist/**/infrastructure/**/*.entity.js'],
  migrationsTableName: 'migrations',
  migrations: ['./migrations/*.ts'],
  synchronize: true,
});
