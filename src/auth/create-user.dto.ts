import { IsString, IsEnum } from 'class-validator';
import { Role } from './role.enum';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;
}

