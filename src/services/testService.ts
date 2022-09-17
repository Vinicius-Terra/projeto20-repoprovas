import * as testRepository from '../repositories/testRepository'
import * as teacherRepository from '../repositories/teacherRepository'
import * as categoryRepository from '../repositories/categoryRepository'
import { Test } from "@prisma/client";
import {ICreateTestData, TypeCreateTestData} from "../types/testTypes"
import {
    conflictError,
    notFoundError,
    unauthorizedError
  } from '../utils/errorUtils';


export async function createTest(test:ICreateTestData) {

    const teacher = await teacherRepository.findUserByName(test.teacher);
    const category = await categoryRepository.findUserByName(test.category);

    if(teacher === null)
        notFoundError('Teacher not registered')
    if(category === null)
        notFoundError('Category not registered')

    const testData =
    {
        name: test.name,
        pdfurl: test.pdfurl,
        categoryId: teacher.id,
        teacherDisciplineId: category.id
    }

    return await testRepository.insertTest(testData);
}