import Joi from 'joi';
import {SignUpUserData, SignInUserData} from "../types/userTypes"

// email checking the IANA list
export const signUpSchema = Joi.object<SignUpUserData>({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
})

export const signInSchema = Joi.object<SignInUserData>({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});
