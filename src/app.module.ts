// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // 🔁 your PostgreSQL username
      password: 'rehan1', // 🔁 your PostgreSQL password
      database: 'postgres', // 🔁 the database name you created
      autoLoadEntities: true,
      synchronize: true, // auto creates tables based on entities
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
