import { Module } from '@nestjs/common'
import { AuthController } from '@/modules/auth/auth.controller'
import { AuthService } from '@/modules/auth/auth.service'
import { CoreModule } from '@/core/core.module'

@Module({
  imports: [CoreModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
