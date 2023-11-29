import { Controller } from '@nestjs/common'
import { AuthService } from '@/modules/auth/auth.service'

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly service: AuthService) {}
}
