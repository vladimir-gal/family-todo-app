import {
  IsUUID,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

export class VerifyPinDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(4)
  pin: string;
}
