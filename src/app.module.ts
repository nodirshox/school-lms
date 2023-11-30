import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { UsersModule } from '@/modules/users/users.module'
import { GroupsModule } from '@/modules/groups/groups.module'
import { SubjectsModule } from '@/modules/subjects/subjects.module'

@Module({
  imports: [CoreModule, AuthModule, UsersModule, GroupsModule, SubjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
