import { Request, Response } from 'express';
import {ICreateTestData} from "../types/testTypes"
import * as testService from "../services/testService"


export async function createTest(req: Request, res: Response) {
  const test:ICreateTestData = req.body;
  const newTest = await testService.createTest(test)
  res.status(201).send(newTest);
}

export async function getAllByDiscipline(req: Request, res: Response) {
  const tests = await testService.seeTestsByDiciplines()
  res.status(200).send(tests);
}

export async function getAllByTeacher(req: Request, res: Response) {
  const tests = await testService.seeTestsByTeachers()
  res.status(200).send(tests);
}


