import * as termRepository from '../repositories/termRepository'
import * as testRepository from '../repositories/testRepository'
import * as disciplineRepository from '../repositories/disciplineRepository'
import * as teacherRepository from '../repositories/teacherRepository'
import * as teacherDisciplineRepository from '../repositories/teacherDisciplineRepository'
import * as categoryRepository from '../repositories/categoryRepository'
import { Test } from "@prisma/client";
import {ICreateTestData, TypeCreateTestData} from "../types/testTypes"
import {
    conflictError,
    notFoundError,
    unauthorizedError
  } from '../utils/errorUtils';


export async function createTest(test:ICreateTestData) {

    const isTestAlreadyRegistred = await testRepository.findByUrl(test.pdfurl);

    if(isTestAlreadyRegistred)
        throw conflictError('Test already registered')

    const teacher = await teacherRepository.findByName(test.teacher);
    const discipline = await disciplineRepository.findByName(test.discipline);
    const category = await categoryRepository.findByName(test.category);
    
    if(teacher === null)
        throw notFoundError('Teacher not registered')
    
    if(discipline === null)
        throw notFoundError('Discipline not registered')
    
    if(category === null)
        throw notFoundError('Category not registered')
    
    const teacherDiscipline = await teacherDisciplineRepository.findByTeacherIdAndDisciplineId(teacher.id, discipline.id);
    if(teacherDiscipline === null)
        throw notFoundError('This teacher do not teach this discipline')


    const testData =
    {
        name: test.name,
        pdfurl: test.pdfurl,
        categoryId: teacher.id,
        teacherDisciplineId: teacherDiscipline.id
    }

    return await testRepository.insertTest(testData);
}

export async function seeTestsByDiciplines() {
    const AllTernsAndDiciplines = await termRepository.getAll();
    const AllTeachers           = await teacherRepository.getAll(); 
    const AllCategoriesAndTests = await categoryRepository.getAll(); 

    // sorry for the immense map, i tried to separate this part in another function, but failed due to lack in TS
    const allTestsByDiciplines = AllTernsAndDiciplines.map((Per)=> {

        const Disciplines = Per.Discipline.map((dis)=>{

            //here i removed from categories the tests that have a diferente discipline
            const filtredCategories = AllCategoriesAndTests.map((cate)=>{
                const Tests = cate.Test.filter((test)=>{ 
                    if(test.TeacherDiscipline.disciplineId === dis.id){
                        return true;
                    }
                })
                const aux = {...cate, Tests};
                delete aux.Test
                return aux;
            }).filter((cate)=>{if(cate.Tests.length > 0) return true})
            
            
            // Join CategoriesTests With Teachers
            const JoinCategoriesTestsAndTeachers = filtredCategories.map((cate)=>{
                const Tests = cate.Tests.map((Test)=>{
                    const Teacher = AllTeachers.find((Teacher)=>{
                        if(Teacher.id === Test.TeacherDiscipline.teacherId){
                            return true;
                        }
                    })
                    return {...Test, Teacher};
                })
                Tests.forEach((test)=> {
                    delete test.Teacher.TeacherDiscipline;
                    delete test.TeacherDiscipline;
            
                })
                return {...cate, Tests} ;
            })
            return {...dis, Categories: JoinCategoriesTestsAndTeachers};
        })
        delete Per.Discipline
        return {...Per, Disciplines};
    })

    return allTestsByDiciplines;
}

export async function seeTestsByTeachers() {
    const AllTeachers           = await teacherRepository.getAll(); 
    const AllCategoriesAndTests = await categoryRepository.getAll();

    const joinTeachersAndCategories = AllTeachers.map((teacher)=>{
        const categoriesAndTests = AllCategoriesAndTests.map((cate)=>{
            const Tests = cate.Test.filter((test)=>{
                if(test.TeacherDiscipline.teacherId === teacher.id)
                    return true;
            })
            
            const aux = {...cate, Tests};
            delete aux.Test
            return aux;
        })
        return {...teacher,  Categories: categoriesAndTests};
    })

  //Removing unnecessary fields
  joinTeachersAndCategories.forEach((teacher)=>{
        delete teacher.TeacherDiscipline;
        teacher.Categories.forEach((cate)=>{
            cate.Tests.forEach((test)=>{
                delete test.teacherDisciplineId
                delete test.TeacherDiscipline
            })
        })
    })

    return joinTeachersAndCategories;
}