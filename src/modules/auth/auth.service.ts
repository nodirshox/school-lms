import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
}
