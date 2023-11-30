import { Module } from '@nestjs/common'
import { AuthController } from '@/modules/auth/auth.controller'
import { AuthService } from '@/modules/auth/auth.service'
import { CoreModule } from '@/core/core.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ACCESS_TOKEN_EXPIRATION_TIME } from '@/consts/tokens'
import { JwtStrategy } from '@/modules/auth/auth.strategy'
import { UsersModule } from '@/modules/users/users.module'

@Module({
  imports: [
    CoreModule,
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: ACCESS_TOKEN_EXPIRATION_TIME },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
