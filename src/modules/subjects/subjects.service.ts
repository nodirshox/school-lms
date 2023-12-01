import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { SubjectsRepository } from '@/modules/subjects/subjects.repository'
import { CreateSubjectDto } from '@/modules/subjects/dto/create-subject.dto'
import { HTTP_MESSAGES } from '@/consts/http-messages'
import { UpdateSubjectDto } from '@/modules/subjects/dto/update-subject.dto'

@Injectable()
export class SubjectsService {
  constructor(private readonly repository: SubjectsRepository) {}

  async createSubject(body: CreateSubjectDto) {
    return this.repository.createSubject(body)
  }

  async getSubject(id: string) {
    const subject = await this.repository.getSubjectById(id)

    if (!subject) {
      throw new NotFoundException(HTTP_MESSAGES.SUBJECT_NOT_FOUND)
    }

    return subject
  }

  async getSubjects() {
    const subjects = await this.repository.getSubjects()
    return { subjects }
  }

  async updateSubject(id: string, body: UpdateSubjectDto) {
    await this.getSubject(id)

    return this.repository.updateSubject(id, body)
  }

  async deleteSubject(id: string) {
    await this.getSubject(id)

    return this.repository.deleteSubject(id)
  }

  async checkTeacherSubject(
    subjectId: string,
    teacherId: string,
  ): Promise<void> {
    const existingTeacherCount = await this.repository.checkTeacherSubject(
      subjectId,
      teacherId,
    )

    if (existingTeacherCount === 0) {
      throw new BadRequestException(HTTP_MESSAGES.TEACHER_IS_NOT_ATTACHED)
    }
  }
}
