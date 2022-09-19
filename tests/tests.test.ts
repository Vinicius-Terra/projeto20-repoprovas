import supertest from 'supertest';
import app from '../src/app';
import { prisma } from '../src/config/database';
import testFactory from './factories/testFactory';
import userFactory from './factories/userFactory';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "tests"`;
});

describe('Test POST /signup', () => {
  it('Should create a new user and return 201', async () => {
    const user = await userFactory();

    const result = await supertest(app).post(`/signup`).send(user);

    expect(result.status).toBe(201);
    expect(result.body).not.toBeNull();
  });

  it('Should send an already registered user and return 409', async () => {
    const user = await userFactory();

    await supertest(app).post(`/signup`).send(user);
    const result = await supertest(app).post(`/signup`).send(user);

    expect(result.status).toBe(409);
  });

  it('Should try create a new user with missing field and return 422', async () => {
    const user = await userFactory();
    delete user.confirmPassword;

    await supertest(app).post(`/signup`).send(user);
    const result = await supertest(app).post(`/signup`).send(user);

    expect(result.status).toBe(422);
  });

});

describe('Test POST /signin', () => {
  it('Should sign in a user account and return 200 with a token', async () => {
    const user = await userFactory();

    await supertest(app).post(`/signup`).send(user);
    const result = await supertest(app).post(`/signin`).send({email: user.email, password: user.password});


    expect(result.status).toBe(200);
    expect(result.body).not.toBeNull();
  });

  it('Should try sign in a user account but with the wrong password and return 401', async () => {
    const user = await userFactory();
    //user factory create a password with 10 characters
    //i will send a password with 7

    await supertest(app).post(`/signup`).send(user);
    const result = await supertest(app).post(`/signin`).send({email: user.email, password:'1234567'});

    expect(result.status).toBe(401);
  });

  it('Should try sign in a user account but with missing password and return 422', async () => {
    const user = await userFactory();

    await supertest(app).post(`/signup`).send(user);
    const result = await supertest(app).post(`/signin`).send({email: user.email});

    expect(result.status).toBe(422);
  });

});

describe('Test POST /test', () => {
  it('Should create a test and return 201', async () => {
    const user = await userFactory();

    await supertest(app).post(`/signup`).send(user);
    const loggedUser = await supertest(app).post(`/signin`).send({email: user.email, password: user.password});
    console.log(loggedUser)

    const test = await testFactory();
    const result = await supertest(app).post(`/test`).send(test).set('Authorization', loggedUser.body.token);

    expect(result.status).toBe(201);
    expect(result.body).not.toBeNull();
  });

  it('Should send an already registered test and return 409', async () => {
    const user = await userFactory();

    await supertest(app).post(`/signup`).send(user);
    const loggedUser = await supertest(app).post(`/signin`).send({email: user.email, password: user.password});
    console.log(loggedUser)

    const test = await testFactory();
    await supertest(app).post(`/test`).send(test).set('Authorization', loggedUser.body.token);
    const result = await supertest(app).post(`/test`).send(test).set('Authorization', loggedUser.body.token);

    expect(result.status).toBe(409);
  });

  it('Should try create test without token and return 401', async () => {
    const test = await testFactory();
    const result = await supertest(app).post(`/test`).send(test)

    expect(result.status).toBe(401);
  });

  it('Should try create test without field and return 422', async () => {
    const user = await userFactory();

    await supertest(app).post(`/signup`).send(user);
    const loggedUser = await supertest(app).post(`/signin`).send({email: user.email, password: user.password});

    const test = await testFactory();
    delete test.discipline;

    await supertest(app).post(`/test`).send(test).set('Authorization', loggedUser.body.token);
    const result = await supertest(app).post(`/test`).send(test).set('Authorization', loggedUser.body.token);

    expect(result.status).toBe(422);
  });

  it('Should try create test with no existing category and return 404', async () => {
    const user = await userFactory();

    await supertest(app).post(`/signup`).send(user);
    const loggedUser = await supertest(app).post(`/signin`).send({email: user.email, password: user.password});

    const test = await testFactory();
    test.category = 'duck';

    await supertest(app).post(`/test`).send(test).set('Authorization', loggedUser.body.token);
    const result = await supertest(app).post(`/test`).send(test).set('Authorization', loggedUser.body.token);

    expect(result.status).toBe(404);
  });

});

describe('Test GET /tests/disciplines', () => {
  it('Deve listar todos os memes e retornar um array e o status 200', async () => {
    const result = await supertest(app).get(`/memes`).send();

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

