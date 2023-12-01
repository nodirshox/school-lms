import * as bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { UserRoles } from '@prisma/client'
import { PASSWORD_SALT } from '../src/consts/password-salt'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      firstName: 'Director',
      lastName: 'Alex',
      username: 'director',
      password: await bcrypt.hash('password', PASSWORD_SALT),
      role: UserRoles.DIRECTOR,
    },
  })
  const teacher = await prisma.user.create({
    data: {
      firstName: 'Teacher',
      lastName: 'George',
      username: 'teacher',
      password: await bcrypt.hash('password', PASSWORD_SALT),
      role: UserRoles.TEACHER,
    },
  })
  const student = await prisma.user.create({
    data: {
      firstName: 'Student',
      lastName: 'John',
      username: 'student',
      password: await bcrypt.hash('password', PASSWORD_SALT),
      role: UserRoles.STUDENT,
    },
  })
  const subject = await prisma.subject.create({
    data: {
      name: 'Math',
    },
  })
  const group = await prisma.group.create({
    data: {
      name: 'CSE-1',
      students: {
        create: {
          student: {
            connect: {
              id: student.id,
            },
          },
        },
      },
    },
  })
  await prisma.subjectTeacherMap.create({
    data: {
      subject: {
        connect: {
          id: subject.id,
        },
      },
      teacher: {
        connect: {
          id: teacher.id,
        },
      },
      group: {
        connect: {
          id: group.id,
        },
      },
    },
  })
  await prisma.grade.create({
    data: {
      grade: 90,
      student: {
        connect: {
          id: student.id,
        },
      },
      subject: {
        connect: {
          id: subject.id,
        },
      },
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
