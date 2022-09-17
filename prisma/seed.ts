import { prisma } from '../src/config/database';

/*
// módulos do curso
INSERT INTO terms ("number") VALUES (1);
INSERT INTO terms ("number") VALUES (2);
INSERT INTO terms ("number") VALUES (3);
INSERT INTO terms ("number") VALUES (4);
INSERT INTO terms ("number") VALUES (5);
INSERT INTO terms ("number") VALUES (6);

// tipos de provas
INSERT INTO categories ("name") VALUES ('Projeto');
INSERT INTO categories ("name") VALUES ('Prática');
INSERT INTO categories ("name") VALUES ('Recuperação');

// professores(as)
INSERT INTO teachers ("name") VALUES ('Diego Pinho');
INSERT INTO teachers ("name") VALUES ('Bruna Hamori');

// disciplinas
INSERT INTO disciplines ("name", "termId") VALUES ('HTML e CSS', 1);
INSERT INTO disciplines ("name", "termId") VALUES ('JavaScript', 2);
INSERT INTO disciplines ("name", "termId") VALUES ('React', 3);
INSERT INTO disciplines ("name", "termId") VALUES ('Humildade', 1);
INSERT INTO disciplines ("name", "termId") VALUES ('Planejamento', 2);
INSERT INTO disciplines ("name", "termId") VALUES ('Autoconfiança', 3);

// professores(as) e disciplinas
INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 1);
INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 2);
INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 3); 
INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 4);
INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 5);
INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 6);

*/

async function main() {

  for(let i=1; i <= 6; i++){
    await prisma.term.upsert({
      where: { number: i},
      update: {},
      create: { number: i}
    });
  }

  const TestCategories = ['Projeto', 'Prática', 'Recuperação']
  for(let i=0; i < 3; i++){
    await prisma.category.upsert({
      where: { name: TestCategories[i]},
      update: {},
      create: { name: TestCategories[i]}
    });
  }

  const teachersName = ['Diego Pinho', 'Bruna Hamori'];
  for(let i=0; i < 2; i++){
    await prisma.teacher.upsert({
      where: { name: teachersName[i]},
      update: {},
      create: { name: teachersName[i]}
    });
  }

  const disciplinesName = ['HTML e CSS', 'JavaScript', 'React', 'Humildade', 'Planejamento', 'Autoconfiança'];
  const disciplinesIds = [1, 2, 3, 1, 2, 3]
  for(let i=0; i < 6; i++){
    await prisma.discipline.upsert({
      where: { name: disciplinesName[i]},
      update: {},
      create: { name: disciplinesName[i], termId:disciplinesIds[i]}
    });
  }

  // teachersDisciplines
  // frist for to use teacherId = 1, 2
  for(let i=1; i <= 2; i++){
    // second for to use disciplineId = 1, 2, ..., 6
    for(let j=1; j <= 6; j++){
      await prisma.teacherDiscipline.upsert({
          where: { teacherId_disciplineId: {teacherId:i, disciplineId:j}},
          update: {},
          create: { teacherId:i, disciplineId:j}
      });
    }
  } 
}

main()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
