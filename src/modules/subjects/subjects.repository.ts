import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { CreateSubjectDto } from '@/modules/subjects/dto/create-subject.dto'
import { Subject } from '@prisma/client'
import { UpdateSubjectDto } from '@/modules/subjects/dto/update-subject.dto'

@Injectable()
export class SubjectsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSubject(body: CreateSubjectDto): Promise<Subject> {
    return this.prisma.subject.create({
      data: { name: body.name },
    })
  }

  async getSubjectById(id: string): Promise<Subject | null> {
    return this.prisma.subject.findUnique({
      where: { id },
    })
  }

  async getSubjects(): Promise<Subject[]> {
    return this.prisma.subject.findMany()
  }

  async updateSubject(id: string, body: UpdateSubjectDto): Promise<Subject> {
    return this.prisma.subject.update({
      where: { id },
      data: { name: body.name },
    })
  }

  async deleteSubject(id: string) {
    return this.prisma.$transaction([
      this.prisma.grade.deleteMany({
        where: { subjectId: id },
      }),
      this.prisma.subjectTeacherMap.deleteMany({
        where: { subjectId: id },
      }),
      this.prisma.subject.delete({
        where: { id },
      }),
    ])
  }

  async checkTeacherSubject(subjectId: string, teacherId: string) {
    return this.prisma.subjectTeacherMap.count({
      where: {
        teacherId,
        subjectId,
      },
    })
  }
}
