import { prisma } from '../config/database';
import { TypeCreateTestData } from "../types/testTypes";


export async function insertTest(user: TypeCreateTestData) {
  return prisma.test.create({
    data: user
  });
}
