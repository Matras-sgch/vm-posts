import { IsString, IsNotEmpty, IsEmail, Min, IsInt, NotContains, MinLength, MaxLength } from 'class-validator';


export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(75)
  readonly name: string
  @IsInt()
  @IsNotEmpty()
  @Min(12)
  readonly age: number
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  @NotContains('password')
  @MinLength(8)
  readonly password: string;
}


