import { Module } from '@nestjs/common'
import { PrismaModule } from '@/core/prisma/prisma.module'
import { PrismaService } from '@/core/prisma/prisma.service'

@Module({
  imports: [PrismaModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CoreModule {}
