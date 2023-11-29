import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { UsersRepository } from '@/modules/users/users.repository'
import { UsersService } from '@/modules/users/users.service'
import { UsersController } from '@/modules/users/users.controller'

@Module({
  imports: [CoreModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
