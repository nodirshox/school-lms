import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtPayloadDto } from '@/modules/auth/dto/jwt-payload.dto'
import { UsersService } from '@/modules/users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: JwtPayloadDto) {
    const user = await this.userService.getUserForAuth(payload.id)

    if (!user) throw new UnauthorizedException()

    return user
  }
}
