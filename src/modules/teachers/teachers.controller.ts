import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateGradeDto } from '@/modules/grades/dto/create-grade.dto'
import { GradesService } from '@/modules/grades/grades.service'
import { JwtAuthGuard } from '@/modules/auth/guards/jwt.guard'
import { IUser } from '@/modules/users/dto/user.interface'
import { User } from '@/decorators/user.decorator'
import { TeachersService } from '@/modules/teachers/teachers.service'
import { RoleGuard } from '@/modules/auth/guards/role.guard'
import { UserRoles } from '@prisma/client'

@ApiTags('Teacher')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard([UserRoles.TEACHER]))
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

  @Get('grades')
  @ApiOperation({ summary: 'Get grades' })
  getGrades(@User() user: IUser) {
    return this.gradeService.getGradesByTeacher(user.id)
  }

  @Delete('grades/:id')
  @ApiOperation({ summary: 'Delete grade' })
  deleteGrade(@User() user: IUser, @Param('id') id: string) {
    return this.gradeService.deleteGrade(user.id, id)
  }

  @Get('groups')
  @ApiOperation({ summary: 'Get group of subjects' })
  getGroupOfSubjects(@User() user: IUser) {
    return this.service.getGroupOfSubjects(user.id)
  }
}
