import { IsNotEmpty, IsMongoId, isNotEmpty } from 'class-validator';

export class UpdateDriverDto {
    @IsNotEmpty()
    @IsMongoId()
    driver: string;
    distance: number;
}