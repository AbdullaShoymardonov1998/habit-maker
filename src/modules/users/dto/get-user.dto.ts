import { ApiProperty } from '@nestjs/swagger'
import { UserRoles } from '@prisma/client'

export class GetUserResponseDto {
  @ApiProperty({ description: 'User Id' })
  id: string

  @ApiProperty({ description: 'User firstname', example: 'John' })
  firstName: string

  @ApiProperty({ description: 'User lastName', example: 'Doe' })
  lastName: string

  @ApiProperty({ description: 'User email', example: 'user@mail.com' })
  email: string

  @ApiProperty({ description: 'User role', enum: UserRoles })
  role: UserRoles

  @ApiProperty({ description: 'User created time', example: new Date() })
  createdAt: Date

  @ApiProperty({ description: 'User latest updated time', example: new Date() })
  updatedAt: Date
}
