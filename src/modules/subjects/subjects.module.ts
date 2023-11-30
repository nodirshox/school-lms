import { Module } from '@nestjs/common'
import { SubjectsService } from '@/modules/subjects/subjects.service'
import { SubjectsController } from '@/modules/subjects/subjects.controller'
import { SubjectsRepository } from '@/modules/subjects/subjects.repository'
import { CoreModule } from '@/core/core.module'

@Module({
  imports: [CoreModule],
  providers: [SubjectsService, SubjectsRepository],
  controllers: [SubjectsController],
})
export class SubjectsModule {}
