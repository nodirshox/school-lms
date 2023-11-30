import { Module } from '@nestjs/common'
import { GroupsService } from '@/modules/groups/groups.service'
import { GroupsController } from '@/modules/groups/groups.controller'
import { CoreModule } from '@/core/core.module'
import { GroupsRepository } from '@/modules/groups/groups.repository'
import { UsersModule } from '@/modules/users/users.module'

@Module({
  imports: [CoreModule, UsersModule],
  providers: [GroupsService, GroupsRepository],
  controllers: [GroupsController],
})
export class GroupsModule {}
