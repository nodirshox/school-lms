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
import { GroupsService } from '@/modules/groups/groups.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateGroupDto } from '@/modules/groups/dto/create-group.dto'
import { UpdateGroupDto } from '@/modules/groups/dto/update-group.dto'
import { AddSubjectToGroup } from '@/modules/groups/dto/subject-to-group.dto'
import { JwtAuthGuard } from '@/modules/auth/guards/jwt.guard'
import { RoleGuard } from '@/modules/auth/guards/role.guard'
import { UserRoles } from '@prisma/client'

@ApiTags('Group')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard([UserRoles.DIRECTOR]))
@Controller({ path: 'groups', version: '1' })
export class GroupsController {
  constructor(private readonly service: GroupsService) {}

  @Post()
  @ApiOperation({ summary: 'Create group' })
  createGroup(@Body() body: CreateGroupDto) {
    return this.service.createGroup(body)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get group' })
  getGroup(@Param('id') id: string) {
    return this.service.getGroup(id)
  }

  @Get()
  @ApiOperation({ summary: 'Get groups' })
  getGroups() {
    return this.service.getGroups()
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update group' })
  updateGroup(@Param('id') id: string, @Body() body: UpdateGroupDto) {
    return this.service.updateGroup(id, body)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete group' })
  deleteGroup(@Param('id') id: string) {
    return this.service.deleteGroup(id)
  }

  @Post(':id/subjects')
  @ApiOperation({ summary: 'Add subject to group' })
  addSubjectToGroup(@Param('id') id: string, @Body() body: AddSubjectToGroup) {
    return this.service.addSubjectToGroup(id, body)
  }

  @Delete(':id/subjects')
  @ApiOperation({ summary: 'Delete subject to group' })
  deletSubjectFromGroup(
    @Param('id') id: string,
    @Body() body: AddSubjectToGroup,
  ) {
    return this.service.deletSubjectFromGroup(id, body)
  }
}
