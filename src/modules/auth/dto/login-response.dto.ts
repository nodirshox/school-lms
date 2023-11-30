import { GetUserDto } from '@/modules/users/dto/get-user.dto'
import { ApiProperty } from '@nestjs/swagger'

export class TokenDto {
  @ApiProperty({ description: "User's access token" })
  accessToken: string
}

export class LoginResponseDto {
  @ApiProperty({ description: 'User information' })
  user: GetUserDto

  @ApiProperty({ description: 'User token' })
  token: TokenDto
}
