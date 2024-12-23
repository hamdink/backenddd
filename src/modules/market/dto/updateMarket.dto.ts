import { IsOptional, IsString } from 'class-validator';

export class UpdateMarketDto {
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString() 
  @IsOptional()  
  codePostal?: string;  
  @IsOptional()
  latitude?: number;
  @IsOptional() 
  longitude?: number;
}
