import { IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator";

export class ClientDto {
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;

    @IsNotEmpty()
    @IsString()
    address1: string;

    @IsOptional()
    @IsString()
    address2: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsOptional()
    @IsString()
    code_postal: string;

    @IsOptional()
    @IsString()
    code_postal2: string;

    @IsOptional()  // Make this optional since it's calculated and not input by user
    @IsNumber()
    longitude?: number;

    @IsOptional()  // Make this optional since it's calculated and not input by user
    @IsNumber()
    latitude?: number;
}
