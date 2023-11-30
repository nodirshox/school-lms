import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { GroupsRepository } from '@/modules/groups/groups.repository'
import { CreateGroupDto } from '@/modules/groups/dto/create-group.dto'
import { UsersService } from '@/modules/users/users.service'
import { HTTP_MESSAGES } from '@/consts/http-messages'
import { UpdateGroupDto } from '@/modules/groups/dto/update-group.dto'
import { AddSubjectToGroup } from '@/modules/groups/dto/subject-to-group.dto'
import { SubjectsService } from '@/modules/subjects/subjects.service'

@Injectable()
export class GroupsService {
  constructor(
    private readonly repository: GroupsRepository,
    private readonly userService: UsersService,
    private readonly subjectsService: SubjectsService,
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

  async addSubjectToGroup(groupId: string, body: AddSubjectToGroup) {
    await this.checkGroup(groupId)
    await this.userService.checkTeacher(body.teacherId)
    await this.subjectsService.getSubject(body.subjectId)

    const existingGroups = await this.repository.checkSubjectGroup(
      groupId,
      body,
    )
    if (existingGroups !== 0) {
      throw new BadRequestException(HTTP_MESSAGES.SUBJECT_GROUP_EXISTS)
    }

    return this.repository.addSubjectToGroup(groupId, body)
  }

  async deletSubjectFromGroup(groupId: string, body: AddSubjectToGroup) {
    const existingGroups = await this.repository.checkSubjectGroup(
      groupId,
      body,
    )
    if (existingGroups === 0) {
      throw new BadRequestException(HTTP_MESSAGES.SUBJECT_GROUP_NOT_EXISTS)
    }

    await this.repository.deletSubjectFromGroup(groupId, body)

    return { message: HTTP_MESSAGES.SUBJECT_GROUP_DELETED }
  }

  private async checkGroup(id: string) {
    const groupCount = await this.repository.checkGroup(id)

    if (groupCount === 0) {
      throw new NotFoundException(HTTP_MESSAGES.GROUP_NOT_FOUND)
    }
  }
}
