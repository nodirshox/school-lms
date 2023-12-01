import { Module } from '@nestjs/common'
import { GradesService } from '@/modules/grades/grades.service'
import { CoreModule } from '@/core/core.module'
import { GradesRepository } from '@/modules/grades/grades.repository'
import { UsersModule } from '@/modules/users/users.module'
import { SubjectsModule } from '@/modules/subjects/subjects.module'

@Module({
  imports: [CoreModule, UsersModule, SubjectsModule],
  providers: [GradesService, GradesRepository],
  controllers: [],
  exports: [GradesService],
})
export class GradesModule {}
