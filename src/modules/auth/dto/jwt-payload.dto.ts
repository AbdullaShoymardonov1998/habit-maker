import { UserRoles } from '@prisma/client'

export interface JwtPayloadDto {
  id: string
  role: UserRoles
}
