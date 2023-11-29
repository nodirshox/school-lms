import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UsersService } from '@/modules/users/users.service'
import { CreateUserDto } from '@/modules/users/dto/create-user.dto'
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto'

@ApiTags('User')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  createUser(@Body() body: CreateUserDto) {
    return this.service.createUser(body)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user' })
  getUser(@Param('id') id: string) {
    return this.service.getUser(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.service.updateUser(id, body)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  deleteUser(@Param('id') id: string) {
    return this.service.deleteUser(id)
  }
}
