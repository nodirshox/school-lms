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

  getGrade(id: string) {
    return this.prisma.grade.findUnique({
      where: { id },
    })
  }

  getGradesByStudent(studentId: string) {
    return this.prisma.grade.findMany({
      where: {
        studentId,
      },
      select: {
        id: true,
        grade: true,
        subject: {
          select: {
            id: true,
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

  deleteGrade(id: string) {
    return this.prisma.grade.delete({
      where: { id },
    })
  }

  getGradesByTeacher(teacherId: string) {
    return this.prisma.grade.findMany({
      where: {
        subject: {
          subjectTeacherMap: {
            some: {
              teacherId,
            },
          },
        },
      },
      select: {
        id: true,
        grade: true,
        subject: {
          select: {
            id: true,
            name: true,
          },
        },
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    })
  }
}
