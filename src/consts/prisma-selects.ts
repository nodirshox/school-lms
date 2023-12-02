export const selectUser = {
  id: true,
  firstName: true,
  lastName: true,
  username: true,
  role: true,
  createdAt: true,
  updatedAt: true,
}

export const selectGroup = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
  students: {
    include: {
      student: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  },
  subjectTeacherMap: {
    include: {
      subject: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
}
