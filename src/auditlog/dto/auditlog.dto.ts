import {
    IsString,
    IsUUID,
    IsNumber,
    IsOptional,
    IsEmail,
} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateAuditlogDto {

  @ApiProperty({
    type: String
  })
  @IsUUID(4)
  user_id: string;

  @ApiProperty({
    type: String,
    description: "Action",
  })
  @IsString()
  action: string;

  @ApiProperty({
    type: String,
    description: "Description",
  })
  @IsString()
  description: string;
}
