import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import { testSchema } from '../schemas/testSchema'
import { createTest } from '../controllers/testController'

const testRouter = Router();

testRouter.post('/test', validateSchemaMiddleware(testSchema), createTest);

export default testRouter;
