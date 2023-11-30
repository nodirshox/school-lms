import { UserRoles } from '@prisma/client'

export interface IUser {
  id: string
  role: UserRoles
}
