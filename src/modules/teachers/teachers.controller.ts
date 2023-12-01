import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateGradeDto } from '@/modules/grades/dto/create-grade.dto'
import { GradesService } from '@/modules/grades/grades.service'
import { JwtAuthGuard } from '@/modules/auth/guards/jwt.guard'
import { IUser } from '@/modules/users/dto/user.interface'
import { User } from '@/decorators/user.decorator'
import { TeachersService } from '@/modules/teachers/teachers.service'

@ApiTags('Teacher')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'teachers', version: '1' })
export class TeachersController {
  constructor(
    private readonly service: TeachersService,
    private readonly gradeService: GradesService,
  ) {}

  @Post('grades')
  @ApiOperation({ summary: 'Create grade' })
  createGrade(@User() user: IUser, @Body() body: CreateGradeDto) {
    return this.gradeService.createGrade(user.id, body)
  }

  @Get('groups')
  @ApiOperation({ summary: 'Get group of subjects' })
  getGroupOfSubjects(@User() user: IUser) {
    return this.service.getGroupOfSubjects(user.id)
  }
}
