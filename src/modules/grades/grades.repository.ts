import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { CreateGradeDto } from '@/modules/grades/dto/create-grade.dto'

@Injectable()
export class GradesRepository {
  constructor(private readonly prisma: PrismaService) {}

  createGrade(body: CreateGradeDto) {
    return this.prisma.grade.create({
      data: {
        grade: body.grade,
        student: {
          connect: {
            id: body.studentId,
          },
        },
        subject: {
          connect: {
            id: body.subjectId,
          },
        },
      },
    })
  }

  getGrade(id: string) {
    return this.prisma.grade.findUnique({
      where: { id },
    })
  }

  getGradesByStudent(studentId: string) {
    return this.prisma.grade.findMany({
      where: {
        studentId,
      },
      select: {
        id: true,
        grade: true,
        subject: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  }

  checkStudentSubject(studentId: string, subjectId: string) {
    return this.prisma.subjectTeacherMap.count({
      where: {
        subjectId,
        group: {
          students: {
            some: {
              student: {
                id: studentId,
              },
            },
          },
        },
      },
    })
  }

  deleteGrade(id: string) {
    return this.prisma.grade.delete({
      where: { id },
    })
  }

  getGradesByTeacher(teacherId: string) {
    return this.prisma.grade.findMany({
      where: {
        subject: {
          subjectTeacherMap: {
            some: {
              teacherId,
            },
          },
        },
      },
      select: {
        id: true,
        grade: true,
        subject: {
          select: {
            id: true,
            name: true,
          },
        },
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    })
  }

  getStudentAverageGrades(studentId: string) {
    const sql = `
    SELECT 
        g.name AS "groupName", 
        s.name AS "subjectName", 
        AVG(gr.grade) AS "averageGrade"
    FROM 
        users u
    INNER JOIN 
        student_group_map sgm ON u.id = sgm.user_id
    INNER JOIN 
        groups g ON sgm.group_id = g.id
    INNER JOIN 
        grades gr ON u.id = gr.student_id
    INNER JOIN 
        subject_teacher_map stm ON stm.group_id = g.id
    INNER JOIN 
        subjects s ON stm.subject_id = s.id AND gr.subject_id = s.id
    WHERE 
        u.id = '${studentId}'
    GROUP BY 
        "groupName", "subjectName"
    ORDER BY 
        "groupName" DESC;
    `
    return this.prisma.$queryRawUnsafe(sql)
  }

  getAverageGradesByGroup(groupId: string) {
    const sql = `
    SELECT 
      g.name AS group_name, 
      s.name AS subject_name, 
      AVG(gr.grade) AS average_grade
    FROM 
        grades gr
    INNER JOIN 
        subjects s ON gr.subject_id = s.id
    INNER JOIN 
        student_group_map sgm ON gr.student_id = sgm.user_id
    INNER JOIN 
        groups g ON sgm.group_id = g.id
    WHERE 
        g.id = '${groupId}'
    GROUP BY 
        g.name, s.name;
    `
    return this.prisma.$queryRawUnsafe(sql)
  }
}
