import { Injectable } from '@nestjs/common'
import { StudentsRepository } from '@/modules/students/student.repository'

@Injectable()
export class StudentsService {
  constructor(private readonly repository: StudentsRepository) {}

  async getScheduleByStudent(studentId: string) {
    const schedule = await this.repository.getScheduleByStudent(studentId)

    return { schedule }
  }
}
