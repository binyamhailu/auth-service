import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {
  }
  async  signUp(signUpDto: SignUpDto) {
    try {
      const user = new User();

      user.email = signUpDto.email;
      user.password = await this.hashingService.hash(signUpDto.password);
      console.log(user.password);

       await this.userRepository.save(user);
    } catch (error) {
        console.log(error)
      throw new ConflictException();
    }
  }
  async signIn(signUpDto:SignUpDto) {
    const user =await this.userRepository.findOneBy({
        email:signUpDto.email
    })
    if(!user){
        throw new UnauthorizedException("User Doesn't Exist, please try again")
    }
    const isPasswordEqual= await this.hashingService.compare(signUpDto.password, user.password)
    if(!isPasswordEqual){
        throw new UnauthorizedException("Emaill or password is Incorrect")
    }
    return true;
  }
}
