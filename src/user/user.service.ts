import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
 
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({where:{username:username}});
  }

  async findById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({where:{id:id}});
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
  async findAll():Promise<User[]>{
    return this.userRepository.find();
  }
}

