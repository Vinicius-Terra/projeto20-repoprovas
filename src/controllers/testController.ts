import { Request, Response } from 'express';
import {ICreateTestData} from "../types/testTypes"
import * as testService from "../services/testService"


export async function createTest(req: Request, res: Response) {
  const test:ICreateTestData = req.body;
  const newTest = await testService.createTest(test)
  res.send(newTest).status(201);
}

export async function getAllByDiscipline(req: Request, res: Response) {
  const tests = await testService.seeTestsByDiciplines()
  res.send(tests).status(200);
}

export async function getAllByTeacher(req: Request, res: Response) {
  const tests = await testService.seeTestsByTeachers()
  res.send(tests).status(200);
}


