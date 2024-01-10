import { UserRoles } from '@prisma/client'

export interface IUser {
  id: string
  email: string
  role: UserRoles
}
