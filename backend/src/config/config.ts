import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  postgres_db: string
  postgres_host: string
  postgres_password: string
  postgres_port: number
  postgres_user: string
}


const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  postgres_db: process.env.POSTGRES_DB || '',
  postgres_host: process.env.POSTGRES_HOST || '',
  postgres_password: process.env.POSTGRES_PASSWORD || '',
  postgres_port: Number(process.env.POSTGRES_PORT) || 5432,
  postgres_user: process.env.POSTGRES_USER || '',
};

export default config;