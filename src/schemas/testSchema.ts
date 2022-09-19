import joi from "joi";
import {ICreateTestData} from "../types/testTypes"

export const testSchema = joi.object<ICreateTestData>({
  name: joi.string().min(2).required(),
  pdfurl: joi.string().uri().required(),
  category: joi.string().min(2).required(),
  teacher: joi.string().min(3).required(),
  discipline: joi.string().min(2).required()
});
