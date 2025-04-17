import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<string | null> {
    const user = await this.userService.validateUser(username, password);
    if (!user) {
      return null;
    }

    const payload: JwtPayload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload); // Generate JWT token
  }

  async validateUser(payload: JwtPayload): Promise<User | null> {
    return this.userService.findOne(payload.username); // Ensure this method exists in UserService
  }
}
