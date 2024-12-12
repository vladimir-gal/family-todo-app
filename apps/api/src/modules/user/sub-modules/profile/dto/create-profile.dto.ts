import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProfileDto {
  @IsUUID()
  @IsNotEmpty()
  userFkId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(4)
  pin?: string;
}
