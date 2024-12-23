import { IsNotEmpty, IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Secteur } from '../../secture/schema/secteurs.schema';

export class UpdatePlanDto {
  @IsOptional()
  @IsNotEmpty()
  Date: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Secteur)
  secteurMatinal: Secteur[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Secteur)
  secteurApresMidi: Secteur[];

  @IsOptional()
  @IsNumber()
  totalMatin: number;

  @IsOptional()
  @IsNumber()
  totalMidi: number;

  @IsOptional()
  @IsString()
  notes: string;

  @IsOptional()
  @Type(() => String)
  market: string | null;
}
