import { Request, Response } from 'express';
import {ICreateTestData} from "../types/testTypes"


export async function createTest(req: Request, res: Response) {
  const test:ICreateTestData = req.body;
  // await test.createUser(test);
  res.sendStatus(201);
}


