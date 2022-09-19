import { Request, Response } from 'express';
import {SignUpUserData, SignInUserData} from "../types/userTypes"
import userService from '../services/userService';

export async function signUp(req: Request, res: Response) {
  const user:SignUpUserData = req.body;
  await userService.createUser(user);
  res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const user:SignInUserData = req.body;
  const token = await userService.login(user);
  res.send({ token });
}
