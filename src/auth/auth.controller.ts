import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string, password: string }) {
    const { username, password } = loginDto;
    const accessToken = await this.authService.login(username, password);
    if (!accessToken) {
      return { message: 'Invalid credentials' };
    }
    return { access_token: accessToken };
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
  }
}
