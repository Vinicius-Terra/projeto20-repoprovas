import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import { signUpSchema, signInSchema } from '../schemas/userSchema';
import { signIn, signUp } from './../controllers/authController';

const authRouter = Router();

authRouter.post('/signup', validateSchemaMiddleware(signUpSchema), signUp);
authRouter.post('/signin', validateSchemaMiddleware(signInSchema), signIn);

export default authRouter;
