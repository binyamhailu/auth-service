import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import jwtConfig from '../config/jwt.config';
import { HashingService } from '../hashing/hashing.service';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
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
    const accesstoken = await this.jwtService.signAsync({
        sub:user.id,
        email:user.email
    } as ActiveUserData ,
     {
        audience:this.jwtConfiguration.audiance,
        issuer:this.jwtConfiguration.issuer,
        secret:this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl
     }
    )
    return {accesstoken};
  }
}
