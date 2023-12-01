import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
@Injectable()
export class StudentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getScheduleByStudent(studentId: string) {
    return this.prisma.subjectTeacherMap.findMany({
      where: {
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
      select: {
        group: {
          select: {
            id: true,
            name: true,
          },
        },
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        subject: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  }
}
