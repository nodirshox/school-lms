import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Username',
    example: 'director',
  })
  username: string

  @IsString()
  @ApiProperty({
    description: 'Password',
    example: 'password',
  })
  password: string
}
