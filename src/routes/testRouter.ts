import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import { ensureAuthenticatedMiddleware } from "../middlewares/authMiddleware"
import { testSchema } from '../schemas/testSchema'
import { createTest, getAllByDiscipline, getAllByTeacher } from '../controllers/testController'

const testRouter = Router();

testRouter.post('/test', ensureAuthenticatedMiddleware, validateSchemaMiddleware(testSchema), createTest);
testRouter.get('/tests/disciplines', ensureAuthenticatedMiddleware, getAllByDiscipline);
testRouter.get('/tests/teachers', ensureAuthenticatedMiddleware, getAllByTeacher);

export default testRouter;
