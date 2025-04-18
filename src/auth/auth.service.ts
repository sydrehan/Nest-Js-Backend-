import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<any> {
    const { email, password } = createUserDto;
    const user = await this.userService.findByEmail(email);
    if (user) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return { message: 'Signup successful', userId: newUser._id };
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);

    return { message: 'Login successful', token };
  }
}