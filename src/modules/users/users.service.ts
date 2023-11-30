import { UsersRepository } from '@/modules/users/users.repository'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateUserDto } from '@/modules/users/dto/create-user.dto'
import { HTTP_MESSAGES } from '@/consts/http-messages'
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto'
import { UtilsService } from '@/core/utils/utils.service'
import { UserRoles } from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly utils: UtilsService,
  ) {}

  async createUser(body: CreateUserDto) {
    const existingUser = await this.getUserByUsername(body.username)

    if (existingUser) {
      throw new BadRequestException(HTTP_MESSAGES.USERNAME_EXISTS)
    }
    body.password = await this.utils.generateBcrypt(body.password)

    return this.repository.createUser(body)
  }

  async getUser(id: string) {
    const user = await this.repository.getUserById(id)

    if (!user) {
      throw new NotFoundException(HTTP_MESSAGES.USER_NOT_FOUND)
    }

    return user
  }

  async getTeachers() {
    return this.repository.getUsersByRole(UserRoles.TEACHER)
  }

  async getStudents() {
    return this.repository.getUsersByRole(UserRoles.STUDENT)
  }

  async updateUser(id: string, body: UpdateUserDto) {
    await this.getUser(id)

    const existingUser = await this.getUserByUsername(body.username)

    if (existingUser && existingUser.id !== id) {
      throw new BadRequestException(HTTP_MESSAGES.USERNAME_EXISTS)
    }
    body.password = await this.utils.generateBcrypt(body.password)

    return this.repository.updateUser(id, body)
  }

  async deleteUser(id: string) {
    await this.getUser(id)
    await this.repository.deleteUser(id)

    return { message: HTTP_MESSAGES.USER_DELETED }
  }

  private async getUserByUsername(username: string) {
    return this.repository.getUserByUsername(username)
  }

  async getUserByUsernameWithPassword(username: string) {
    return this.repository.getUserByUsernameWithPassword(username)
  }
}
