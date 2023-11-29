import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '@/modules/users/dto/create-user.dto'
import { User } from '@prisma/client'
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto'

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(body: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        password: body.password,
      },
    })
  }

  async getUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    })
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
    })
  }

  async updateUser(id: string, body: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        password: body.password,
      },
    })
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    })
  }
}
