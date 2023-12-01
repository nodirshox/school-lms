import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { GradesService } from '@/modules/grades/grades.service'
import { JwtAuthGuard } from '@/modules/auth/guards/jwt.guard'
import { User } from '@/decorators/user.decorator'
import { IUser } from '@/modules/users/dto/user.interface'
import { StudentsService } from '@/modules/students/students.service'
import { RoleGuard } from '@/modules/auth/guards/role.guard'
import { UserRoles } from '@prisma/client'

@ApiTags('Student')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard([UserRoles.STUDENT]))
@Controller({ path: 'students', version: '1' })
export class StudentsController {
  constructor(
    private readonly service: StudentsService,
    private readonly gradesService: GradesService,
  ) {}

  @Get('grades')
  @ApiOperation({ summary: 'Get grades by student' })
  getGradesByStudent(@User() user: IUser) {
    return this.gradesService.getGradesByStudent(user.id)
  }

  @Get('schedule')
  @ApiOperation({ summary: 'Get grades by student' })
  getScheduleByStudent(@User() user: IUser) {
    return this.service.getScheduleByStudent(user.id)
  }
}
