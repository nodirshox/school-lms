import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class DeleteGradeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Student Id', example: 'uuid' })
  studentId: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Subject Id', example: 'uuid' })
  subjectId: string
}
