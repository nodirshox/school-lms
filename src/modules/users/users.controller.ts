import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UsersService } from '@/modules/users/users.service'
import { CreateUserDto } from '@/modules/users/dto/create-user.dto'
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto'
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard'
import { User } from '@/decorators/user.decorator'
import { IUser } from '@/modules/users/dto/user.interface'

@ApiTags('User')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  createUser(@Body() body: CreateUserDto) {
    return this.service.createUser(body)
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by token' })
  @UseGuards(JwtAuthGuard)
  getUserByToken(@User() user: IUser) {
    return this.service.getUser(user.id)
  }

  @Get('teachers')
  @ApiOperation({ summary: 'Get teachers' })
  getTeachers() {
    return this.service.getTeachers()
  }

  @Get('students')
  @ApiOperation({ summary: 'Get students' })
  getStudents() {
    return this.service.getStudents()
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
