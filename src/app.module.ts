import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { AuthModule } from '@/modules/auth/auth.module'

@Module({
  imports: [CoreModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
