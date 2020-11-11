import { IsString, IsNotEmpty, IsInt, MaxLength, IsArray } from 'class-validator';


export class CreatePlaneDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(75)
  readonly name: string
  @IsInt()
  @IsNotEmpty()
  readonly seats: number
  @IsString()
  @IsNotEmpty()
  readonly route: string;
  @IsString()
  @IsNotEmpty()
  readonly date: Date;
  @IsString()
  @IsNotEmpty()
  readonly time: Date;
  // @IsArray()
  // readonly seatsLeft: number[]
}


