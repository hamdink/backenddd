import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateMarketDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  numberMa: number;

  @IsNotEmpty()
  @IsNumber()
  numberMi: number;

  @IsNotEmpty()
  @IsNumber()
  numberMaInitial: number;

  @IsNotEmpty()
  @IsNumber()
  numberMiInitial: number;

  @IsNotEmpty()
  @IsString()
  codePostal: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;
}
