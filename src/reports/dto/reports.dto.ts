import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class CreateFineDto {
        @ApiProperty()
        @IsUUID()
        fine_id: string;

        @ApiProperty()
        amount_paid: number;

        @ApiProperty()
        payment_method: string;
}