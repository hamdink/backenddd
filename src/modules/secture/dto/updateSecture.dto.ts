
import { IsOptional, IsString, IsArray, ArrayMinSize, IsNumber } from 'class-validator';

export class UpdateSecteurDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  codesPostaux?: number[];
}
