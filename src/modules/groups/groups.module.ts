import { Module } from '@nestjs/common'
import { GroupsService } from '@/modules/groups/groups.service'
import { GroupsController } from '@/modules/groups/groups.controller'
import { CoreModule } from '@/core/core.module'
import { GroupsRepository } from '@/modules/groups/groups.repository'
import { UsersModule } from '@/modules/users/users.module'
import { SubjectsModule } from '@/modules/subjects/subjects.module'

@Module({
  imports: [CoreModule, UsersModule, SubjectsModule],
  providers: [GroupsService, GroupsRepository],
  controllers: [GroupsController],
  exports: [GroupsService],
})
export class GroupsModule {}
