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
    await this.checkStudentSubject(body.studentId, body.subjectId)

    return this.repository.createGrade(body)
  }

  async deleteGrade(teacherId: string, gradeId: string) {
    const existingGrade = await this.repository.getGrade(gradeId)
    if (!existingGrade) {
      throw new BadRequestException(HTTP_MESSAGES.GRADE_NOT_FOUND)
    }

    await this.subjectService.checkTeacherSubject(
      existingGrade.subjectId,
      teacherId,
    )

    await this.repository.deleteGrade(gradeId)

    return { message: HTTP_MESSAGES.GRADE_DELETED }
  }

  async getGradesByStudent(studentId: string) {
    const grades = await this.repository.getGradesByStudent(studentId)

    const convertedGrades = grades.map((grade) => {
      return {
        id: grade.id,
        grade: grade.grade,
        subject: {
          id: grade.subject.id,
          name: grade.subject.name,
        },
      }
    })

    return { grades: convertedGrades }
  }

  private async checkStudentSubject(
    studentId: string,
    subjectId: string,
  ): Promise<void> {
    const existingSubjectCount = await this.repository.checkStudentSubject(
      studentId,
      subjectId,
    )
    if (existingSubjectCount === 0) {
      throw new BadRequestException(HTTP_MESSAGES.STUDENT_SUBJECT_NOT_EXISTS)
    }
  }

  async getGradesByTeacher(teacherId: string) {
    const grades = await this.repository.getGradesByTeacher(teacherId)

    return { grades }
  }
}
