import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class ProdcutDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    image?: string;

  }