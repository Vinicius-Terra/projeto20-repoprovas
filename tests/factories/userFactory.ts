import { faker } from '@faker-js/faker';

export default async function testFactory() {
  const password = faker.internet.password(10)
  return {
    email: faker.internet.email(),
    password,
    confirmPassword: password

  };
}
