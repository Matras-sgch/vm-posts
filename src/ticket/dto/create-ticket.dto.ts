import { IsString, IsNotEmpty, IsNumber } from "class-validator";


export class CreateTicketDTO {
    @IsString()
    @IsNotEmpty()
    readonly route: String;
    @IsNumber()
    @IsNotEmpty()
    readonly seat: number;
    @IsNumber()
    @IsNotEmpty()
    readonly price: number;
    @IsString()
    @IsNotEmpty()
    readonly date: string;
    @IsString()
    @IsNotEmpty()
    readonly time: string;
    @IsString()
    @IsNotEmpty()
    readonly planeId: string;
    @IsString()
    @IsNotEmpty()
    readonly ownerId: string;
}