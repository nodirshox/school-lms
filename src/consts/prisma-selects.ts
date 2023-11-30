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
}
