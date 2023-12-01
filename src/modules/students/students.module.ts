import { Module } from '@nestjs/common'
import { StudentsController } from '@/modules/students/students.controller'
import { GradesModule } from '@/modules/grades/grades.module'
import { StudentsService } from '@/modules/students/students.service'
import { CoreModule } from '@/core/core.module'
import { StudentsRepository } from '@/modules/students/student.repository'

@Module({
  imports: [CoreModule, GradesModule],
  controllers: [StudentsController],
  providers: [StudentsService, StudentsRepository],
})
export class StudentsModule {}
