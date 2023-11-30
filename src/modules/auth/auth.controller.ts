import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from '@/modules/auth/auth.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { LoginDto } from '@/modules/auth/dto/login.dto'
import { LoginResponseDto } from '@/modules/auth/dto/login-response.dto'

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @ApiTags('Sign in')
  @ApiOperation({ summary: 'Login into system' })
  @ApiResponse({ status: HttpStatus.CREATED, type: LoginResponseDto })
  login(@Body() body: LoginDto) {
    return this.service.login(body)
  }
}
