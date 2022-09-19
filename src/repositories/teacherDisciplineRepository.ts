import { prisma } from '../config/database';

export async function findByTeacherIdAndDisciplineId(teacherId: number, disciplineId: number) {
  return prisma.teacherDiscipline.findUnique({
    where: {
      teacherId_disciplineId: {teacherId , disciplineId}
    }
  });
}

export async function getAllTeachersAndT(teacherId: number, disciplineId: number) {
  return prisma.teacherDiscipline.findUnique({
    where: {
      teacherId_disciplineId: {teacherId , disciplineId}
    }
  });
}

