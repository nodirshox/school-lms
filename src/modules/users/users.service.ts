import { UsersRepository } from '@/modules/users/users.repository'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateUserDto } from '@/modules/users/dto/create-user.dto'
import { HTTP_MESSAGES } from '@/consts/http-messages'
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async createUser(body: CreateUserDto) {
    const existingUser = await this.repository.getUserByUsername(body.username)

    if (existingUser) {
      throw new BadRequestException(HTTP_MESSAGES.USERNAME_EXISTS)
    }

    // TODO: hash password

    return this.repository.createUser(body)
  }

  async getUser(id: string) {
    const user = await this.repository.getUserById(id)

    if (!user) {
      throw new NotFoundException(HTTP_MESSAGES.USER_NOT_FOUND)
    }
    delete user.password

    return user
  }

  async updateUser(id: string, body: UpdateUserDto) {
    await this.getUser(id)

    const existingUser = await this.repository.getUserByUsername(body.username)

    if (existingUser && existingUser.id !== id) {
      throw new BadRequestException(HTTP_MESSAGES.USERNAME_EXISTS)
    }
    // TODO: hash password
    const updatedUser = await this.repository.updateUser(id, body)
    delete updatedUser.password
    return updatedUser
  }

  async deleteUser(id: string) {
    await this.getUser(id)
    await this.repository.deleteUser(id)

    return { message: HTTP_MESSAGES.USER_DELETED }
  }
}
