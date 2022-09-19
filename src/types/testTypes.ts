import { Test } from "@prisma/client";

export interface ICreateTestData{
    name: string;
    pdfurl: string;
    category: string;
    teacher: string;
    discipline: string;
}

export type TypeCreateTestData = Omit<Test, "id">

