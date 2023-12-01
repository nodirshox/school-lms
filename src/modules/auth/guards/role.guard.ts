import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { UserRoles } from '@prisma/client'

export function RoleGuard(roles: UserRoles[]): CanActivate {
  @Injectable()
  class RoleBasedGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
      super()
    }

    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest()
      const user = request.user

      return user && roles.includes(user.role)
    }
  }

  return new RoleBasedGuard(new Reflector())
}
