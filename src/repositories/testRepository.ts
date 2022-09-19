import { prisma } from '../config/database';
import { TypeCreateTestData } from "../types/testTypes";


export async function insertTest(user: TypeCreateTestData) {
  return prisma.test.create({
    data: user
  });
}

export async function findByUrl(pdfurl: string) {
  return prisma.test.findFirst({
    where: {
      pdfurl
    }
  });
}