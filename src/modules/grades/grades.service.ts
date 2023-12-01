import { BadRequestException, Injectable } from '@nestjs/common'
import { GradesRepository } from '@/modules/grades/grades.repository'
import { CreateGradeDto } from '@/modules/grades/dto/create-grade.dto'
import { UsersService } from '@/modules/users/users.service'
import { SubjectsService } from '@/modules/subjects/subjects.service'
import { HTTP_MESSAGES } from '@/consts/http-messages'

@Injectable()
export class GradesService {
  constructor(
    private readonly repository: GradesRepository,
    private readonly userService: UsersService,
    private readonly subjectService: SubjectsService,
  ) {}

  async createGrade(teacherId: string, body: CreateGradeDto) {
    await this.userService.checkStudent(body.studentId)
    await this.subjectService.getSubject(body.subjectId)
    await this.subjectService.checkTeacherSubject(body.subjectId, teacherId)

    const existingSubjectCount = await this.repository.checkStudentSubject(
      body.studentId,
      body.subjectId,
    )
    if (existingSubjectCount === 0) {
      throw new BadRequestException(HTTP_MESSAGES.STUDENT_SUBJECT_NOT_EXISTS)
    }

    const existingGradeCount = await this.repository.checkGrade(
      body.studentId,
      body.subjectId,
    )
    if (existingGradeCount !== 0) {
      throw new BadRequestException(HTTP_MESSAGES.GRADE_EXISTS)
    }

    return this.repository.createGrade(body)
  }

  async getGradesByStudent(studentId: string) {
    const grades = await this.repository.getGradesByStudent(studentId)

    const convertedGrades = grades.map((grade) => {
      return {
        grade: grade.grade,
        subjectName: grade.subject.name,
      }
    })

    return { grades: convertedGrades }
  }
}
