import { prisma } from './../config/database';

export async function findByName(name: string) {
  return prisma.category.findUnique({
    where: {
      name
    }
  });
}

export async function getAll() {
  return prisma.category.findMany({
    include: {
      Test: {
        include: {
          TeacherDiscipline: true
        }
      }
    }
  });
}