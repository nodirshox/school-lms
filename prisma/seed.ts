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
  await prisma.user.create({
    data: {
      firstName: 'Teacher',
      lastName: 'George',
      username: 'teacher',
      password: await bcrypt.hash('password', PASSWORD_SALT),
      role: UserRoles.TEACHER,
    },
  })
  await prisma.user.create({
    data: {
      firstName: 'Student',
      lastName: 'John',
      username: 'student',
      password: await bcrypt.hash('password', PASSWORD_SALT),
      role: UserRoles.STUDENT,
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
