import { Injectable, NotFoundException } from '@nestjs/common'
import { GroupsRepository } from '@/modules/groups/groups.repository'
import { CreateGroupDto } from '@/modules/groups/dto/create-group.dto'
import { UsersService } from '@/modules/users/users.service'
import { HTTP_MESSAGES } from '@/consts/http-messages'
import { UpdateGroupDto } from './dto/update-group.dto'

@Injectable()
export class GroupsService {
  constructor(
    private readonly repository: GroupsRepository,
    private readonly userService: UsersService,
  ) {}

  async createGroup(body: CreateGroupDto) {
    await this.userService.checkStudentIds(body.studentIds)
    return this.repository.createGroup(body)
  }

  async getGroup(id: string) {
    await this.checkGroup(id)
    const group = await this.repository.getGroupById(id)

    const students = group.students.map((gt) => gt.student)

    return { ...group, students }
  }

  async getGroups() {
    const groups = await this.repository.getGroups()

    const convertedGroups = groups.map((group) => {
      return {
        ...group,
        students: group.students.map((gt) => gt.student),
      }
    })

    return { groups: convertedGroups }
  }

  async updateGroup(id: string, body: UpdateGroupDto) {
    await this.checkGroup(id)
    await this.userService.checkStudentIds(body.studentIds)
    const updatedGroup = await this.repository.updateGroup(id, body)

    return updatedGroup[1]
  }

  async deleteGroup(id: string) {
    await this.checkGroup(id)
    await this.repository.deleteGroup(id)
    return { message: HTTP_MESSAGES.GROUP_DELETED }
  }

  private async checkGroup(id: string) {
    const groupCount = await this.repository.checkGroup(id)

    if (groupCount === 0) {
      throw new NotFoundException(HTTP_MESSAGES.GROUP_NOT_FOUND)
    }
  }
}
