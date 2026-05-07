import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Meal } from './meals/meal.entity';

// Load the local .env to get DB connection details for the CLI
config({ path: '.env' });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'restaurant',
  entities: [Meal],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
});
