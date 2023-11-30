import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '@/modules/users/dto/create-user.dto'
import { User, UserRoles } from '@prisma/client'
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto'
import { GetUserDto } from '@/modules/users/dto/get-user.dto'
import { selectUser } from '@/consts/select-user'

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(body: CreateUserDto): Promise<GetUserDto | null> {
    return this.prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        password: body.password,
        role: body.role,
      },
      select: selectUser,
    })
  }

  async getUserById(id: string): Promise<GetUserDto | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: selectUser,
    })
  }

  async getUsersByRole(role: UserRoles): Promise<GetUserDto[]> {
    return this.prisma.user.findMany({
      where: { role },
      select: selectUser,
    })
  }

  async getUserByUsername(username: string): Promise<GetUserDto | null> {
    return this.prisma.user.findUnique({
      where: { username },
      select: selectUser,
    })
  }

  async getUserByUsernameWithPassword(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
    })
  }

  async updateUser(
    id: string,
    body: UpdateUserDto,
  ): Promise<GetUserDto | null> {
    return this.prisma.user.update({
      where: { id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        password: body.password,
        role: body.role,
      },
      select: selectUser,
    })
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    })
  }
}
