import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';  // Corrected to UsersService
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';  // Import TypeOrmModule
import { User } from '../users/entities/user.entity';  // Import User entity for TypeORM

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),  // Use TypeORM to feature User
    JwtModule.register({
      secret: 'secretKey123',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, UsersService, JwtStrategy],  // Corrected to UsersService
  controllers: [AuthController],
})
export class AuthModule {}
