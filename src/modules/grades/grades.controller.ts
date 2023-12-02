import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/modules/auth/guards/jwt.guard'
import { RoleGuard } from '@/modules/auth/guards/role.guard'
import { UserRoles } from '@prisma/client'
import { GradesService } from '@/modules/grades/grades.service'

@ApiTags('Grade reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard([UserRoles.DIRECTOR, UserRoles.TEACHER]))
@Controller({ path: 'grades', version: '1' })
export class GradesController {
  constructor(private readonly service: GradesService) {}

  @Get('students/:studentId')
  @ApiOperation({ summary: 'Get student average students' })
  getStudentAverageGrades(@Param('studentId') id: string) {
    return this.service.getStudentAverageGrades(id)
  }

  @Get('groups/:groupId')
  @ApiOperation({ summary: 'Get student average students' })
  getAverageGradesByGroup(@Param('groupId') id: string) {
    return this.service.getAverageGradesByGroup(id)
  }
}
