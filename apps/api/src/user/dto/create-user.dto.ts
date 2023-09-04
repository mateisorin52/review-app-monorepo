import { IsString, MinLength, MaxLength, IsEmail, Matches, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
