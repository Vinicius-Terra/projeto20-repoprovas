import { prisma } from './../config/database';

export async function findUserByName(name: string) {
  return prisma.category.findUnique({
    where: {
      name
    }
  });
}

