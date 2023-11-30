import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { SubjectsService } from '@/modules/subjects/subjects.service'
import { CreateSubjectDto } from '@/modules/subjects/dto/create-subject.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UpdateSubjectDto } from '@/modules/subjects/dto/update-subject.dto'

@ApiTags('Subject')
@Controller({ path: 'subjects', version: '1' })
export class SubjectsController {
  constructor(private readonly service: SubjectsService) {}

  @Post()
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
  @ApiOperation({ summary: 'Update subject' })
  updateSubject(@Body() body: UpdateSubjectDto, @Param('id') id: string) {
    return this.service.updateSubject(id, body)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete subject' })
  deleteSubject(@Param('id') id: string) {
    return this.service.deleteSubject(id)
  }
}
