import { prisma } from '../config/database';

export async function findByName(name: string) {
  return prisma.teacher.findUnique({
    where: {
      name
    }
  });
}

export async function getAll() {
  return prisma.teacher.findMany({
    include: {
      TeacherDiscipline: true
    }
  });
}
