import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';  // Corrected to UsersService
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,  // Corrected to UsersService
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<any> {
    const { email, password } = createUserDto;
    const user = await this.usersService.findByEmail(email);  // Corrected to usersService
    if (user) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return { message: 'Signup successful', userId: newUser.id };  // Corrected field to id
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);  // Corrected to usersService
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const payload = { email: user.email, sub: user.id };  // Corrected field to id
    const token = this.jwtService.sign(payload);

    return { message: 'Login successful', token };
  }
}
