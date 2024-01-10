import { ApiProperty } from '@nestjs/swagger'

export class MessageResponseDto {
  @ApiProperty({ description: 'Message', example: 'Success' })
  message: string
}
