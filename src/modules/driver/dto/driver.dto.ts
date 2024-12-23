import { IsString, IsNotEmpty, IsEmail,MinLength } from 'class-validator';

export class DriverDto {
  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty({ message: 'Password should not be empty.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  password: string;
}