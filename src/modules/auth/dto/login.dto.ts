// src/modules/auth/dto/login.dto.ts
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  rememberMe: boolean;
  
}
