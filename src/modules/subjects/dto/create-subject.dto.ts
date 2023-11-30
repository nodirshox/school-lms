import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nmae', example: 'English' })
  name: string
}
