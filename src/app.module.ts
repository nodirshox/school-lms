import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { UsersModule } from '@/modules/users/users.module'
import { GroupsModule } from '@/modules/groups/groups.module'
import { SubjectsModule } from '@/modules/subjects/subjects.module'
import { GradesModule } from '@/modules/grades/grades.module'
import { StudentsModule } from '@/modules/students/students.module'
import { TeachersModule } from '@/modules/teachers/teachers.module'

@Module({
  imports: [
    CoreModule,
    AuthModule,
    UsersModule,
    GroupsModule,
    SubjectsModule,
    GradesModule,
    StudentsModule,
    TeachersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
