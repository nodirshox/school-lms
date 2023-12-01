import { Injectable } from '@nestjs/common'
import { TeachersRepository } from '@/modules/teachers/teachers.repository'

@Injectable()
export class TeachersService {
  constructor(private readonly repository: TeachersRepository) {}

  async getGroupOfSubjects(teacherId: string) {
    const groups = await this.repository.getGroupOfSubjects(teacherId)
    const convertedGroups = groups.map((gr) => {
      return {
        ...gr,
        group: {
          id: gr.group.id,
          name: gr.group.name,
          students: gr.group.students.map((st) => st.student),
        },
      }
    })
    return { groups: convertedGroups }
  }
}
