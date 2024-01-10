import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsString } from 'class-validator'

export class CreateActivityDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Activity Id',
    required: true,
    example: 'uuid',
  })
  habitId: string

  @ApiProperty({
    description: 'Date',
    example: new Date(),
  })
  @IsDateString()
  date: Date
}
