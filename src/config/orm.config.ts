import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your_username', // Replace with your DB username
  password: 'your_password', // Replace with your DB password
  database: 'your_database', // Replace with your DB name
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // Set to false in production
};
