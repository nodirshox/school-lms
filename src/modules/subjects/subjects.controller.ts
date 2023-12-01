import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { SubjectsService } from '@/modules/subjects/subjects.service'
import { CreateSubjectDto } from '@/modules/subjects/dto/create-subject.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UpdateSubjectDto } from '@/modules/subjects/dto/update-subject.dto'
import { JwtAuthGuard } from '@/modules/auth/guards/jwt.guard'
import { RoleGuard } from '@/modules/auth/guards/role.guard'
import { UserRoles } from '@prisma/client'

@ApiBearerAuth()
@ApiTags('Subject')
@UseGuards(JwtAuthGuard)
@Controller({ path: 'subjects', version: '1' })
export class SubjectsController {
  constructor(private readonly service: SubjectsService) {}

  @Post()
  @UseGuards(RoleGuard([UserRoles.DIRECTOR]))
  @ApiOperation({ summary: 'Create subject' })
  createSubject(@Body() body: CreateSubjectDto) {
    return this.service.createSubject(body)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get subject' })
  getSubject(@Param('id') id: string) {
    return this.service.getSubject(id)
  }

  @Get()
  @ApiOperation({ summary: 'Get subjects' })
  getSubjects() {
    return this.service.getSubjects()
  }

  @Put(':id')
  @UseGuards(RoleGuard([UserRoles.DIRECTOR]))
  @ApiOperation({ summary: 'Update subject' })
  updateSubject(@Body() body: UpdateSubjectDto, @Param('id') id: string) {
    return this.service.updateSubject(id, body)
  }

  @Delete(':id')
  @UseGuards(RoleGuard([UserRoles.DIRECTOR]))
  @ApiOperation({ summary: 'Delete subject' })
  deleteSubject(@Param('id') id: string) {
    return this.service.deleteSubject(id)
  }
}
