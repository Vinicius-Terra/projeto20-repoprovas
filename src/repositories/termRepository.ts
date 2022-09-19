import { prisma } from '../config/database';
import { TypeCreateTestData } from "../types/testTypes";


export async function getAll() {
  return prisma.term.findMany({
    include: {
      Discipline: true
    }
  });
}