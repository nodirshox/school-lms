import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TeachersRepository {
  constructor(private readonly prisma: PrismaService) {}

  getGroupOfSubjects(teacherId: string) {
    return this.prisma.subjectTeacherMap.findMany({
      where: {
        teacherId,
      },
      select: {
        group: {
          select: {
            id: true,
            name: true,
            students: {
              select: {
                student: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
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
