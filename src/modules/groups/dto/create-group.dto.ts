import { ApiProperty } from '@nestjs/swagger'
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator'

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Group name', example: 'CSE-17' })
  name: string

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({
    description: 'Student Ids',
    type: [String],
    example: ['studentId'],
  })
  studentIds: string[]
}
