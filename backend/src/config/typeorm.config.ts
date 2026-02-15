import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

// Load environment variables
config();

/**
 * TypeORM configuration for database connection and migrations
 * Supports both local PostgreSQL and Supabase connections
 */
export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER || 'iss_user',
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME || 'iss_orange',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  synchronize: false, // Always use migrations in production
  logging: process.env.NODE_ENV === 'development',
  // SSL configuration for Supabase and other cloud databases
  ssl: process.env.DATABASE_HOST?.includes('supabase.co') 
    ? { rejectUnauthorized: false } 
    : false,
};

// Create and export data source for migrations
const dataSource = new DataSource(typeOrmConfig);
export default dataSource;
