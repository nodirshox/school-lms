import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { CreateGradeDto } from '@/modules/grades/dto/create-grade.dto'

@Injectable()
export class GradesRepository {
  constructor(private readonly prisma: PrismaService) {}

  createGrade(body: CreateGradeDto) {
    return this.prisma.grade.create({
      data: {
        grade: body.grade,
        student: {
          connect: {
            id: body.studentId,
          },
        },
        subject: {
          connect: {
            id: body.subjectId,
          },
        },
      },
    })
  }

  checkGrade(studentId: string, subjectId: string) {
    return this.prisma.grade.count({
      where: {
        studentId,
        subjectId,
      },
    })
  }

  getGradesByStudent(studentId: string) {
    return this.prisma.grade.findMany({
      where: {
        studentId,
      },
      select: {
        grade: true,
        subject: {
          select: {
            name: true,
          },
        },
      },
    })
  }

  checkStudentSubject(studentId: string, subjectId: string) {
    return this.prisma.subjectTeacherMap.count({
      where: {
        subjectId,
        group: {
          students: {
            some: {
              student: {
                id: studentId,
              },
            },
          },
        },
      },
    })
  }
}