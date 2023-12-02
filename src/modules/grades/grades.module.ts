import { Module } from '@nestjs/common'
import { GradesService } from '@/modules/grades/grades.service'
import { CoreModule } from '@/core/core.module'
import { GradesRepository } from '@/modules/grades/grades.repository'
import { UsersModule } from '@/modules/users/users.module'
import { SubjectsModule } from '@/modules/subjects/subjects.module'
import { GradesController } from '@/modules/grades/grades.controller'
import { GroupsModule } from '@/modules/groups/groups.module'

@Module({
  imports: [CoreModule, UsersModule, SubjectsModule, GroupsModule],
  providers: [GradesService, GradesRepository],
  controllers: [GradesController],
  exports: [GradesService],
})
export class GradesModule {}
