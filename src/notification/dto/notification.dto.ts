import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateNotificationDto {

  @ApiProperty({
    description: 'UUID of the user receiving the notification',
    example: 'b0fbbd99-9c0b-4ef8-bb6d-7bb9bd380a22',
  })
  @IsUUID()
  user_id: string;

  @ApiProperty({
    description: 'Message content of the notification',
    example: 'Your book is due in 3 days.',
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'Date when the notification was sent',
    example: '2024-07-15T00:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  date_sent: Date;

  @ApiProperty({
    description: 'Status of the notification (Read or Unread)',
    example: 'Unread',
  })
  @IsString()
  status: string;
}
