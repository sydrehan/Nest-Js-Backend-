import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';  // Corrected to TypeORM User entity

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,  // Inject TypeORM repository
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const createdUser = this.userRepository.create(userData);  // Use TypeORM method
    return this.userRepository.save(createdUser);  // Save with TypeORM
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });  // Use TypeORM method
  }
}
