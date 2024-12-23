import { IsString, IsArray, ArrayMinSize, IsNumber } from 'class-validator';

export class CreateSecteurDto {
  @IsString()
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  codesPostaux: number[];
}