import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Firstname', example: 'John' })
  firstName: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Lastname', example: 'Doe' })
  lastName: string

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({ description: 'Username', example: 'john' })
  username: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ description: 'Password', example: 'password' })
  password: string
}
