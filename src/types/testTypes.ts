import { Test } from "@prisma/client";

export interface ICreateTestData{
    name: string;
    pdfurl: string;
    category: string;
    teacher: string;
    Discipline: string;
}

export type TypeCreateTestData = Omit<Test, "id">

