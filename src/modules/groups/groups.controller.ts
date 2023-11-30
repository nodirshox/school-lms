import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { GroupsService } from '@/modules/groups/groups.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateGroupDto } from '@/modules/groups/dto/create-group.dto'
import { UpdateGroupDto } from '@/modules/groups/dto/update-group.dto'

@ApiTags('Group')
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
}
