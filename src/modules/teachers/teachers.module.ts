import { Module } from '@nestjs/common'
import { TeachersController } from '@/modules/teachers/teachers.controller'
import { TeachersService } from '@/modules/teachers/teachers.service'
import { CoreModule } from '@/core/core.module'
import { GradesModule } from '@/modules/grades/grades.module'
import { TeachersRepository } from '@/modules/teachers/teachers.repository'

@Module({
  imports: [CoreModule, GradesModule],
  controllers: [TeachersController],
  providers: [TeachersService, TeachersRepository],
})
export class TeachersModule {}
