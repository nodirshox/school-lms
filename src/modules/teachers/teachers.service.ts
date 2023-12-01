import { Injectable } from '@nestjs/common'
import { TeachersRepository } from '@/modules/teachers/teachers.repository'

@Injectable()
export class TeachersService {
  constructor(private readonly repository: TeachersRepository) {}

  async getGroupOfSubjects(teacherId: string) {
    const groups = await this.repository.getGroupOfSubjects(teacherId)

    return { groups }
  }
}
