import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class AdminDto {

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
  
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;
  }