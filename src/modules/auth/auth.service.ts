import { UtilsService } from '@/core/utils/utils.service'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { LoginDto } from '@/modules/auth/dto/login.dto'
import { UserRoles } from '@prisma/client'
import { LoginResponseDto } from '@/modules/auth/dto/login-response.dto'
import { HTTP_MESSAGES } from '@/consts/http-messages'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '@/modules/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly utils: UtilsService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async login(body: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userService.getUserByUsernameWithPassword(
      body.username,
    )

    if (!user) {
      throw new NotFoundException(HTTP_MESSAGES.USER_NOT_FOUND)
    }

    const isCorrectPass = await this.utils.compareHash(
      body.password,
      user.password,
    )
    if (!isCorrectPass) {
      throw new BadRequestException(HTTP_MESSAGES.INCORRECT_PASSWORD)
    }

    delete user.password

    return {
      user,
      token: this.generateTokens(user.id, user.role),
    }
  }

  private generateTokens(userId: string, userRole: UserRoles) {
    const payload = { id: userId, role: userRole }

    const accessToken = this.jwtService.sign(payload)

    return { accessToken }
  }
}
