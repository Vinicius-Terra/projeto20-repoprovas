import { prisma } from '../config/database';

export async function findByName(name: string) {
  return prisma.discipline.findUnique({
    where: {
      name
    }
  });
}

