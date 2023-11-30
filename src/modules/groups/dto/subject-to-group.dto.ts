import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class AddSubjectToGroup {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Teacher Id', example: 'uuid' })
  teacherId: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Subject Id', example: 'uuid' })
  subjectId: string
}
