import { Inject, Injectable } from "@nestjs/common";
import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

@Injectable()
export class CreateExpenseDto {
    @IsString()
    id!: string;
    @IsNumber()
    @MinLength(0)
    amount!: number;
    @IsString()
    @MaxLength(50)
    category!: string;
    @IsString()
    @MaxLength(255)
    description!: string
}
