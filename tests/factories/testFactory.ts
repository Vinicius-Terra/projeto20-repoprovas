import { faker } from '@faker-js/faker';

export default async function testFactory() {
  return {
    name: faker.name.jobArea(),
    pdfurl: faker.internet.url(),
    category: "Prática",
    teacher: "Diego Pinho",
    discipline: "React"
  };
}
