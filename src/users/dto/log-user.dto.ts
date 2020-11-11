import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class LogUserDTO {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;
  }