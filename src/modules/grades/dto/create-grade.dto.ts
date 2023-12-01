import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator'

export class CreateGradeDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty({ description: 'Grade', example: 80 })
  grade: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Student Id', example: 'uuid' })
  studentId: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Subject Id', example: 'uuid' })
  subjectId: string
}
