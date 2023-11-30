import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { CreateGroupDto } from '@/modules/groups/dto/create-group.dto'
import { selectGroup } from '@/consts/prisma-selects'
import { UpdateGroupDto } from '@/modules/groups/dto/update-group.dto'

@Injectable()
export class GroupsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createGroup(body: CreateGroupDto) {
    return this.prisma.group.create({
      data: {
        name: body.name,
        students: {
          create: body.studentIds.map((studentId) => {
            return {
              student: {
                connect: {
                  id: studentId,
                },
              },
            }
          }),
        },
      },
    })
  }

  async getGroupById(id: string) {
    return this.prisma.group.findUnique({
      where: { id },
      include: selectGroup,
    })
  }

  async getGroups() {
    return this.prisma.group.findMany({
      include: selectGroup,
    })
  }

  async checkGroup(id: string) {
    return this.prisma.group.count({
      where: { id },
    })
  }

  async updateGroup(id: string, body: UpdateGroupDto) {
    const operations = []
    operations.push(
      this.prisma.studentGroupMap.deleteMany({
        where: {
          groupId: id,
        },
      }),
    )
    operations.push(
      this.prisma.group.update({
        where: { id },
        data: {
          name: body.name,
          students: {
            create: body.studentIds.map((studentId) => {
              return {
                student: {
                  connect: {
                    id: studentId,
                  },
                },
              }
            }),
          },
        },
      }),
    )

    return this.prisma.$transaction(operations)
  }

  async deleteGroup(id: string) {
    const operations = []
    operations.push(
      this.prisma.studentGroupMap.deleteMany({
        where: {
          groupId: id,
        },
      }),
    )
    operations.push(
      this.prisma.group.delete({
        where: {
          id,
        },
      }),
    )

    return this.prisma.$transaction(operations)
  }
}
